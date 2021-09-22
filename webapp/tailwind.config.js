module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      colors: {
        "bookmark-primary": "#1B1464",
        "bookmark-body": "#fafbfc",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
      },
      fontFamily: {
        body: ['PT Sans'],
      },


    },
      
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1324px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};