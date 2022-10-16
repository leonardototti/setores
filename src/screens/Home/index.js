import React, { Component } from "react";
import { Row, Col, Form, Input, Select, Button, notification } from "antd";

import { connect } from "react-redux";

import * as sectorActions from "../../redux/actions/sectorActions";

import * as seo from "../../helpers/seo";

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
								sectors.map((sector) => (
									<div className="sector-item" key={sector?.id}>
										<p>{sector?.name}</p>
									</div>
								))
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
		sectorCreate: (data) => dispatch(sectorActions.sectorCreate(data)),
		sectorUpdate: (data) => dispatch(sectorActions.sectorUpdate(data)),
		sectorDelete: (data) => dispatch(sectorActions.sectorDelete(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);