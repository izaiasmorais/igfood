import { useEffect, useState } from "react";
import { BaseFood, IFood } from "src/@types/types";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { FoodsContainer } from "./styles";
import { ModalEditFood } from "../../components/ModalEditFood";
import api from "../../services/api";

export default function Dashboard() {
	const [foods, setFoods] = useState<IFood[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [editingFood, setEditingFood] = useState({} as IFood);

	async function getFoods() {
		const response = await api.get("/foods");

		const newFoods: IFood[] = response.data;

		setFoods(newFoods);
	}

	useEffect(() => {
		getFoods();
	});

	function toggleModal() {
		if (modalOpen) {
			setModalOpen(false);
		} else {
			setModalOpen(true);
		}
	}

	function toggleEditModal() {
		if (editModalOpen) {
			setEditModalOpen(false);
		} else {
			setEditModalOpen(true);
		}
	}

	async function handleAddFood(food: BaseFood) {
		try {
			const response = await api.post("/foods", {
				...food,
				available: true,
			});

			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleUpdateFood() {
		try {
			const response = await api.put(`/food/${editingFood.id}`, {
				...editingFood,
			});

			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDeleteFood(id: number) {
		await api.delete(`/foods/${id}`);

		const foodsFiltered = foods.filter((food) => food.id !== id);

		setFoods(foodsFiltered);
	}

	function handleEditFood(food: IFood) {
		setEditingFood(food);
		setEditModalOpen(true);
	}

	return (
		<>
			<Header openModal={toggleModal} />

			<ModalAddFood
				isOpen={modalOpen}
				setIsOpen={toggleModal}
				handleAddFood={handleAddFood}
			/>

			<ModalEditFood
				isOpen={editModalOpen}
				setIsOpen={toggleEditModal}
				editingFood={editingFood}
				handleUpdateFood={handleUpdateFood}
			/>

			<FoodsContainer data-testid="foods-list">
				{foods &&
					foods.map((food) => (
						<Food
							key={food.id}
							food={food}
							handleDelete={handleDeleteFood}
							handleEditFood={handleEditFood}
						/>
					))}
			</FoodsContainer>
		</>
	);
}
