const storageKey = "income-tracker-state";
const themeStorageKey = "income-tracker-theme";
const transectionForm = document.querySelector(".add-transection-section");
const descriptionInput = document.querySelector("#des");
const amountInput = document.querySelector("#amount");
const mainBalance = document.querySelector(".main-balance");
const incomeTotal = document.querySelector(".income-box span");
const expenseTotal = document.querySelector(".expense-box span");
const transectionHistory = document.querySelector(
  ".transection-history-container",
);
const storageMessage = document.querySelector(".storage-message");
const themeButton = document.querySelector(".theme-customization-btn");

const state = {
  balance: 0,
  income: 0,
  expense: 0,
  transactions: [],
};

function applyTheme(themeName) {
  const nextTheme = themeName === "dark" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;

  if (!themeButton) {
    return;
  }

  themeButton.dataset.theme = nextTheme;
  themeButton.setAttribute("aria-pressed", String(nextTheme === "dark"));
  themeButton.textContent = nextTheme === "dark" ? "☀️ Light" : "🌙 Dark";
  themeButton.setAttribute(
    "aria-label",
    nextTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );

  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    console.error("Unable to save theme choice.", error);
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);
  applyTheme(savedTheme === "dark" ? "dark" : "light");
}

function showStorageMessage(message) {
  storageMessage.textContent = message;
  storageMessage.hidden = false;
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageMessage.hidden = true;
  } catch (error) {
    showStorageMessage("Could not save your changes to local storage.");
    console.error("Unable to save income tracker data.", error);
  }
}

function createTransactionElement(transaction) {
  const transection = document.createElement("article");
  transection.className = "transection-item";
  transection.dataset.id = transaction.id;

  const transectionDescription = document.createElement("p");
  transectionDescription.className = "transection-description";
  transectionDescription.textContent = transaction.description;

  const transectionAmount = document.createElement("p");
  transectionAmount.className = "transection-amount";
  transectionAmount.textContent = `$${(transaction.amount / 100).toFixed(2)}`;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-transection-btn";
  deleteButton.type = "button";
  deleteButton.textContent = "×";
  deleteButton.setAttribute(
    "aria-label",
    `Delete transaction: ${transaction.description}`,
  );

  transection.append(transectionDescription, transectionAmount, deleteButton);
  return transection;
}

function renderState() {
  mainBalance.textContent = (state.balance / 100).toFixed(2);
  incomeTotal.textContent = (state.income / 100).toFixed(2);
  expenseTotal.textContent = (state.expense / 100).toFixed(2);
  transectionHistory.replaceChildren(
    ...state.transactions.map(createTransactionElement),
  );
}

function loadState() {
  const savedState = localStorage.getItem(storageKey);
  if (savedState === null) {
    return;
  }

  const parsedState = JSON.parse(savedState);
  if (
    !parsedState ||
    !Array.isArray(parsedState.transactions) ||
    !Number.isSafeInteger(parsedState.balance) ||
    !Number.isSafeInteger(parsedState.income) ||
    (parsedState.expense !== undefined &&
      !Number.isSafeInteger(parsedState.expense)) ||
    !parsedState.transactions.every(
      (transaction) =>
        typeof transaction.id === "string" &&
        typeof transaction.description === "string" &&
        Number.isSafeInteger(transaction.amount) &&
        transaction.amount > 0,
    )
  ) {
    throw new Error("Saved income tracker data has an invalid format.");
  }

  state.balance = parsedState.balance;
  state.income = parsedState.income;
  state.expense = parsedState.expense ?? 0;
  state.transactions = parsedState.transactions;
}

try {
  loadTheme();
  loadState();
  renderState();
} catch (error) {
  showStorageMessage(
    "Could not load saved data. Clear this site's local storage to start over.",
  );
  transectionForm.querySelector("button[type='submit']").disabled = true;
  console.error("Unable to load income tracker data.", error);
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

transectionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Math.round(Number(amountInput.value) * 100);
  const description = descriptionInput.value.trim();
  const transaction = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    description,
    amount,
  };

  state.transactions.unshift(transaction);
  state.balance += amount;
  state.income += amount;
  renderState();
  saveState();
  transectionForm.reset();
});

transectionHistory.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const deleteButton = event.target.closest(".delete-transection-btn");
  if (!deleteButton) {
    return;
  }

  const transactionElement = deleteButton.closest(".transection-item");
  const transactionIndex = state.transactions.findIndex(
    (transaction) => transaction.id === transactionElement.dataset.id,
  );
  if (transactionIndex === -1) {
    return;
  }

  const [transaction] = state.transactions.splice(transactionIndex, 1);
  state.balance -= transaction.amount;
  state.expense += transaction.amount;
  renderState();
  saveState();
});
