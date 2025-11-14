export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        tealCustom: "#06b6a4",
        deepBlue: "#052a2b"
      },
      boxShadow: {
        'fut-1': '0 12px 30px rgba(4,18,29,0.06)',
        'fut-2': '0 22px 48px rgba(6,30,40,0.08)'
      }
    },
  },
  plugins: [],
};
