import AsyncStorage from '@react-native-async-storage/async-storage';

export type Meal = {
	id: string;
	name: string;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	createdAt: string; // ISO string
};

const MEALS_KEY = 'meals';

export async function getMeals(): Promise<Meal[]> {
	try {
		const json = await AsyncStorage.getItem(MEALS_KEY);
		return json ? JSON.parse(json) : [];
	} catch (error) {
		console.error('Error fetching meals:', error);
		return [];
	}
}

export async function addMeal(
	meal: Omit<Meal, 'id' | 'createdAt'>,
): Promise<Meal> {
	try {
		const meals = await getMeals();
		const newMeal: Meal = {
			...meal,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
		};
		const updatedMeals = [newMeal, ...meals];
		await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(updatedMeals));

		return newMeal;
	} catch (error) {
		console.error('Error adding meal:', error);
		throw error;
	}
}
