import React, { Component } from "react";
import { Row, Col, Form, Input, Select, Button, notification } from "antd";

import * as seo from "../../helpers/seo";

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
		// TODO
	}

	render() {
		return (
			<main id="site-main" role="main">
				<div className="container">
					<header>
						<h1>Setores</h1>
						<Button type="primary" onClick={this.onNewSector}>Adicionar setor</Button>
					</header>
				</div>
			</main>
		);
	}
}

export default Home;