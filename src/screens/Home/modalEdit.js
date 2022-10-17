import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { Modal, Form, Button, Row, Col, notification } from "antd";

import FloatLabelInput from "../../components/FloatLabelInput";

import { connect } from "react-redux";

import * as sectorActions from "../../redux/actions/sectorActions";

import { AiFillCloseCircle } from "react-icons/ai";

class ModalEdit extends Component {
	static propTypes = {
		onClose: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible     : false,
			isLoading   : false,
			id	   	    : 0,
			activeSector: {},
			roles	    : [],
			roleInput   : '',
		};
	}

	onOpen = (id) => {
		this.setState({
			visible  : true,
			id 	     : id,
			roleInput: '',
		}, () => {
			const activeSector = this.props.sectors.find(sector => sector.id === id);

			setTimeout(() => {
				this.form.setFieldValue('name', activeSector.name);
				
				this.setState({
					roles: activeSector.roles,
					activeSector: activeSector,
				});
			}, 100);
		});
	};

	onClose = () => {
		this.setState({
			visible  : false,
			isLoading: false,
			roles    : [],
		});

		// Callback
		if( typeof this.props.onClose === 'function' )
		{
			this.props.onClose();
		}
	};

	onRoleAdd = () => {
		const { roles, roleInput, activeSector } = this.state;

		if(roles.find(role => role.name === roleInput)) {
			notification.error({
				message: 'Erro',
				description: 'Este cargo já existe nesse setor.',
			});

			return;
		}

		if(this.props.sectors.filter(sector => sector.id !== activeSector.id).find(sector => sector.roles.find(role => role.name === roleInput))) {
			notification.error({
				message: 'Erro',
				description: 'Este cargo já existe em outro setor.',
			});

			return;
		}
		
		if(roleInput) {
			this.setState({
				roles: [...roles, {
					id: Math.floor(Math.random() * 1000000),
					name: roleInput,
				}],
				roleInput: '',
			});
		}
	};

	onRoleDelete = (id) => {
		const { roles } = this.state;

		this.setState({
			roles: roles.filter((role) => role.id !== id),
		});
	};

	onSaveClick = (e) => {
		const { roles } = this.state;

		if(roles.length === 0 || !roles) {
			e.preventDefault();

			notification.error({
				message: 'Erro',
				description: 'É necessário adicionar pelo menos um cargo a esse setor.',
			});
		}
	};

	onFinish = (values) => {
		const { id, roles, activeSector } = this.state;

		this.setState({
			isLoading: true,
		});

		if(this.props.sectors.filter(sector => sector.id !== activeSector.id).find(sector => sector.name === values.name)) {
			notification.error({
				message: 'Erro',
				description: 'Este setor já existe.',
			});

			this.setState({
				isLoading: false,
			});

			return;
		}

		this.props.sectorUpdate({
			id: id,
			name: values.name,
			roles: roles,
		});

		notification.success({
			message: 'Sucesso',
			description: 'Setor atualizado com sucesso.',
		});

		this.onClose();
	};

	render() {
		const { visible, isLoading, roles, roleInput } = this.state;

		return (
			<Modal
				visible={visible}
				wrapClassName="modal-edit-sector modal-mobile-full"
				footer={null}
				centered
				width={780}
				destroyOnClose={true}
				onCancel={this.onClose}
				autoFocusButton={false}
				focusTriggerAfterClose={false}
				maskClosable={false}
			>
				<h2>Editar setor</h2>
				<p className="subtitle">Preencha as informações abaixo para editar esse setor.</p>
				<Form
					ref={el => this.form = el}
					layout="vertical"
					scrollToFirstError
					onFinish={this.onFinish}
				>
					<Form.Item name="name" rules={[{required: true, message: "Campo obrigatório."}]}>
						<FloatLabelInput placeholder="Nome" disabled={isLoading} />
					</Form.Item>
					<Row gutter={10} className="mb-20">
						<Col span={16}>
							<FloatLabelInput value={roleInput} onChange={(e) => this.setState({ roleInput: e.target.value })} onPressEnter={(e) => {e.preventDefault(); this.onRoleAdd()}} placeholder="Cargo(s)" disabled={isLoading} />
						</Col>
						<Col span={8}>
							<Button size="small" type="secondary" block onClick={this.onRoleAdd} disabled={isLoading}>Adicionar</Button>
						</Col>
					</Row>
					<div className="role-container">
						{
							roles.map((role, index) => (
								<div className="role-item" key={role.id} onClick={() => this.onRoleDelete(role.id)}>
									{role.name} <AiFillCloseCircle size="20px" />
								</div>
							))
						}
					</div>
					<Button type="primary" htmlType="submit" block loading={isLoading} onClick={this.onSaveClick}>Salvar</Button>
				</Form>
			</Modal>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		sectors: state.sector.sectors,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sectorUpdate: (data) => dispatch(sectorActions.sectorUpdate(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ModalEdit);