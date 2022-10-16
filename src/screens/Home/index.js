import React, { Component } from "react";
import { Row, Col, Form, Input, Select, Button, notification, Collapse } from "antd";

import { connect } from "react-redux";

import * as sectorActions from "../../redux/actions/sectorActions";

import * as seo from "../../helpers/seo";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import ModalCreate from "./modalCreate";

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
								accordion
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
													<Button size="small" shape="circle" type="primary"><MdEdit size="20px" /></Button>
													<Button size="small" shape="circle" type="danger"><FaTrash size="16px" /></Button>
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