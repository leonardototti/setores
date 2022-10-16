import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from "./config/general";

import Main from "./screens/Main";

if( process.env.NODE_ENV !== 'development' )
{
	console.log('' +
		' .d8888b.  888                       888    \n' +
		'd88P  Y88b 888                       888    \n' +
		'Y88b.      888                       888    Este é um recurso de navegador voltado \n' +
		' "Y888b.   888888  .d88b.  88888b.   888    para desenvolvedores. Se alguém disse \n' +
		'    "Y88b. 888    d88""88b 888 "88b  888    para você copiar e colar algo aqui para \n' +
		'      "888 888    888  888 888  888  Y8P    ativar um recurso do Site ou "invadir" \n' +
		'Y88b  d88P Y88b.  Y88..88P 888 d88P         a conta de outra pessoa, isso é uma fraude \n' +
		' "Y8888P"   "Y888  "Y88P"  88888P"   888    e você dará a ele acesso à sua conta.\n' +
		'                           888              \n' +
		'                           888              Para sua segurança, jamais execute códigos aqui!\n' +
		'                           888              \n' +
		'');
}

class App extends Component {
	render() {
		return (
			<BrowserRouter basename={ROUTE_PATH}>
				<Main />
			</BrowserRouter>
		);
	}
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);