import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Game from '../pages/Game'
import Settings from '../pages/Settings'

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Settings />} />
				<Route path='/game' element={<Game />} />
			</Routes>
		</Router>
	)
}
