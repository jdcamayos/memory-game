import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

interface Character {
	id: number
	label: string
}

const CHARACTERS: Character[] = [
	{
		id: 0,
		label: 'Rick & Morty',
	},
	{
		id: 1,
		label: 'Pokemon',
	},
]

interface Size {
	id: number
	qty: number
}

const SIZES: Size[] = [
	{
		id: 0,
		qty: 8,
	},
	{
		id: 1,
		qty: 10,
	},
	{
		id: 2,
		qty: 12,
	},
	{
		id: 3,
		qty: 14,
	},
]

export default function Settings() {
	const formik = useFormik({
		initialValues: {
			username: '',
			size: 0,
			characters: 0,
		},
		onSubmit: values => {
			console.log(values)
		},
	})

	return (
		<div className='px-4'>
			<main className='grid place-content-center h-[90vh]'>
				<h2 className='text-center text-4xl'>Settings</h2>
				<form className='max-w-[400px]' onSubmit={formik.handleSubmit}>
					<div className='py-2'>
						<label className=''>Username</label>
						<input
							className='w-full text-center text-black'
							type='text'
							onChange={formik.handleChange('username')}
							value={formik.values.username}
							placeholder='Your name'
						/>
					</div>
					<div className='py-2 d-flex flex-col'>
						<label className=''>Characters</label>
						<select className='w-full text-black'>
							{CHARACTERS.map(option => (
								<option className='text-center' key={option.id} value={option.label}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					<div className='py-2 d-flex flex-row'>
						<label className=''>Sizes</label>
						<select className='w-full text-black'>
							{SIZES.map(option => (
								<option className='text-center' key={option.id} value={option.qty}>
									{option.qty}
								</option>
							))}
						</select>
					</div>

					<button
						className='mt-2 border p-2 w-full hover:bg-white hover:text-black'
            type='submit'
						disabled={formik.values.username.length > 3}
					>
						Let's play
					</button>
				</form>
			</main>
		</div>
	)
}
