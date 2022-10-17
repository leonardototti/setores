import React, { Component } from "react";
import { Button, Collapse, Modal } from "antd";

import { connect } from "react-redux";

import * as sectorActions from "../../redux/actions/sectorActions";

import * as seo from "../../helpers/seo";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import ModalCreate from "./modalCreate";
import ModalEdit from "./modalEdit";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		document.body.classList.add("page-home");

		seo.setTitle("Setores");
	}

	componentWillUnmount() {
		document.body.classList.remove("page-home");
	}

	onNewSector = () => {
		this.modalCreate.onOpen();
	}

	onEditSector = (id) => {
		this.modalEdit.onOpen(id);
	}

	onDeleteSector = (sector) => {
		Modal.confirm({
			title: 'Excluir setor',
			content: 'Tem certeza que deseja excluir este setor?',
			okText: 'Sim',
			cancelText: 'Não',
			centered: true,
			onOk: () => {
				this.props.sectorDelete(sector);
			},
		});
	}

	render() {
		const { sectors } = this.props;

		const { Panel } = Collapse;

		return (
			<main id="site-main" role="main">
				<div className="container">
					<header>
						<h1>Setores</h1>
						<Button type="primary" onClick={this.onNewSector}>Adicionar setor</Button>
					</header>
					<div className="sectors-container">
						{
							sectors.length > 0 ?
							<Collapse
								defaultActiveKey={sectors[0].id}
								expandIconPosition="end"
							>
								{
									sectors.map((sector) => (
										<Panel header={sector.name} key={sector.id}>
											<div className="sector-item" key={sector.id}>
												{
													sector.roles.length > 0 ?
													<div className="role-container">
														{
															sector.roles.map((role) => (
																<div className="role-item" key={role.id}>
																	{role.name}
																</div>
															))
														}
													</div>
													:
													<p>Nenhum cargo cadastrado nesse setor.</p>
												}
												<div className="action-container">
													<Button size="small" shape="circle" type="primary" onClick={() => this.onEditSector(sector.id)}><MdEdit size="20px" /></Button>
													<Button size="small" shape="circle" type="danger" onClick={() => this.onDeleteSector(sector)}><FaTrash size="16px" /></Button>
												</div>
											</div>
										</Panel>
									))
								}
							</Collapse>
							:
							<p>Nenhum setor cadastrado.</p>
						}
					</div>
				</div>
				<ModalCreate
					ref={el => this.modalCreate = el}
				/>
				<ModalEdit
					ref={el => this.modalEdit = el}
				/>
			</main>
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
		sectorDelete: (data) => dispatch(sectorActions.sectorDelete(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);