export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	savingAccount: {
		balance: number;
	};
}

export const usuarios: User[] = [
	{
		id: 1,
		name: "John Doe",
		email: "john_doe@gmail.com",
		password: "123456",
		savingAccount: {
			balance: 0,
		},
	},
];

export const getBalance = (userId: number) => {
	const user = usuarios.find((u) => u.id === userId);

	if (!user) {
		return { success: false, message: "Usuario no encontrado" };
	}

	return {
		success: true,
		balance: user.savingAccount.balance,
		userName: user.name,
	};
};

export const addBalance = (userId: number, amount: number) => {
	const user = usuarios.find((u) => u.id === userId);

	if (!user) {
		return { success: false, message: "Usuario no encontrado" };
	}

	if (amount <= 0) {
		return { success: false, message: "La cantidad debe ser mayor que cero" };
	}

	user.savingAccount.balance += amount;

	return {
		success: true,
		message: "Depósito realizado exitosamente",
		balance: user.savingAccount.balance,
	};
};

export const debitBalance = (userId: number, amount: number) => {
	const user = usuarios.find((u) => u.id === userId);

	if (!user) {
		return { success: false, message: "Usuario no encontrado" };
	}

	if (amount <= 0) {
		return { success: false, message: "La cantidad debe ser mayor que cero" };
	}

	if (user.savingAccount.balance < amount) {
		return { success: false, message: "Saldo insuficiente" };
	}

	user.savingAccount.balance -= amount;

	return {
		success: true,
		message: "Retiro realizado exitosamente",
		balance: user.savingAccount.balance,
	};
};
