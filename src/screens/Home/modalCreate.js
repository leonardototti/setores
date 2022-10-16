import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { Modal, Form, Button, Row, Col, notification } from "antd";

import FloatLabelInput from "../../components/FloatLabelInput";

import { connect } from "react-redux";

import * as sectorActions from "../../redux/actions/sectorActions";

import { AiFillCloseCircle } from "react-icons/ai";

class ModalCreate extends Component {
	static propTypes = {
		onClose: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			visible  : false,
			isLoading: false,
			roles	 : [],
			roleInput: '',
		};
	}

	onOpen = () => {
		this.setState({
			visible: true,
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
		const { roles, roleInput } = this.state;

		if(roles.find(role => role.name === roleInput)) {
			notification.error({
				message: 'Erro',
				description: 'Este cargo já existe.',
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
				description: 'É necessário adicionar pelo menos um cargo.',
			});
		}
	};

	onFinish = (values) => {
		const { roles } = this.state;
		
		this.setState({
			isLoading: true,
		});

		this.props.sectorCreate(
			{
				id: Math.floor(Math.random() * 1000000),
				name: values.name,
				roles: roles,
			}
		);

		this.onClose();
	};

	render() {
		const { visible, isLoading, roles, roleInput } = this.state;

		return (
			<Modal
				visible={visible}
				wrapClassName="modal-create-sector modal-mobile-full"
				footer={null}
				centered
				width={780}
				destroyOnClose={true}
				onCancel={this.onClose}
				autoFocusButton={false}
				focusTriggerAfterClose={false}
			>
				<h2>Adicionar setor</h2>
				<p className="subtitle">Preencha as informações abaixo para cadastrar um novo setor.</p>
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
		sectorCreate: (data) => dispatch(sectorActions.sectorCreate(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(ModalCreate);