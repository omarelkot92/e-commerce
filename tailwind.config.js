/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container : {
      center:true
    },
    extend: {
      colors:{
        primary:{
         50:"#0aad0a",
         100:"#099c09",
         200:"#088a08",
         300:"#077907",
         400:"#066806",
         500:"#055705",
         600:"#044504",
         700:"#033403",
         800:"#022302",
         900:"#011101",
        }
      }, 
      screens:{"2xl":"1120px"}
    },
  },
  plugins: [],
};

