export const registerWithEmailPassword = async (
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:9000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:9000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};