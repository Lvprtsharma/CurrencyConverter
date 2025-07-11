# 💱 Currency Converter Web App

A simple and responsive currency converter app built with vanilla JavaScript. It allows users to convert currencies in real-time using the [Fawaz Ahmed Currency API](https://github.com/fawazahmed0/currency-api) and displays flags for selected currencies.

---

## 🌐 Live Demo

Coming soon! This project will be deployed on Netlify or Github Pages.

---

## 📸 Screenshots

*(Screenshots will be added soon)*

---

## 🚀 Features

- Real-time currency conversion
- Automatically fetches latest exchange rates
- Displays national flags for selected currencies
- User-friendly interface
- Defaults to converting USD ➡️ INR
- Validates input to ensure minimum value of 1 and numeric only

---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)
- [Fawaz Currency API](https://github.com/fawazahmed0/currency-api)
- [FlagsAPI](https://flagsapi.com/)

---

## 📂 Folder Structure

```
currency-converter/
│
├── index.html          # Main HTML file
├── style.css           # App styling
├── app.js              # JavaScript logic
├── codes.js            # Object mapping currency codes to country codes
├── assets/             # Images, screenshots, etc.
└── README.md           # This file
```

---

## 📦 How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/Lvprtsharma/CurrencyConverter.git
cd CurrencyConverter
```

2. **Open index.html in your browser:**
   - You can double-click the file, or use a live server in VS Code.

---

## 🧠 How It Works

- Currency codes are populated from a `codes.js` file
- Flags are shown using FlagsAPI
- When the form is submitted, a request is made to the Fawaz API:
  ```
  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/<CurrencyCode>.json
  ```
- The exchange rate is retrieved from the JSON response and used for conversion.

---

## 📈 API Used

- **Currency Data**: [Fawaz Ahmed Currency API](https://github.com/fawazahmed0/currency-api)
- **Flag Images**: [FlagsAPI](https://flagsapi.com/)

---

## 🌐 Browser Compatibility

This app works on all modern browsers that support ES6+ JavaScript features.

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. All contributions are welcome!

---

## 🙋‍♂️ Author

**Lovepreet Sharma**
- 📧 [lvprtsharma@gmail.com](mailto:lvprtsharma@gmail.com)
- 🌐 [GitHub](https://github.com/Lvprtsharma)
- 🔗 [LinkedIn](https://www.linkedin.com/in/lovepal/)

---

## 📝 License

This project is licensed under the MIT License.

---

**Feel free to fork or star this repo if you found it helpful!** ⭐