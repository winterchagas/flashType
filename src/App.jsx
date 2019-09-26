import React from 'react';
import './index.scss';
import SegundoComponent from './Neno.jsx';

var listaDeNomes = [
	'NENO',
	'HARLEY',
	'MARIA NIDIA',
];

// [
// 	<div></div>,
// 	<div></div>,
// 	<div></div>,
// 	<div></div>,
// 	<div></div>,
// ]

const App = () => {
	return (
		<div className="container">
			<p>React here!</p>
			{
				listaDeNomes.map(function (nome) {
					return (
						<div>
							<div>DIV DE CIMA</div>
						<SegundoComponent
							name={nome}
						/>
						</div>
					)
				})
			}
			<p>React here!</p>
		</div>
	);
};

export default App;