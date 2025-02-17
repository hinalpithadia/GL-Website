/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily : {
        'helvetica': ['Helvetica Neue'],
        'helvetica-light': ['Helvetica Neue Light'],
        'helvetica-medium': ['Helvetica Neue Medium'],
        'helvetica-bold': ['Helvetica Neue Bold'],
        'helvetica-condensed-bold': ['Helvetica Neue Condensed Bold'],
        'GT-America-Trial': ['GT America Trial'],
        'GT-America-Trial-Bold': ['GT America Trial Bold'],
      },
      colors : {
        'black_neutral' : '#161616',
        'bg_black_neutral':'#161616',
        'neutral_light' : '#C6C6C6',
        'skin' : '#B2811F',
        'gray' : '#6F6F6F',
        'darkgray' : '#393939',
        'lightgray' : '#A8A8A8',

      },
      keyframes: {
        "scale_first": {
          "0%": {
            opacity: 1,
            transform: "scale(1)",
          },
          "40%": {
            opacity: 1,
            transform: "scale(4)",
          },
          "60%": {
            opacity: 1,
            transform: "scale(4.4)",
          },
          "100%": {
            opacity: 0.5,
            transform: "scale(12)",
            
          },
        },
        "zoom-out-down": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, -30%, 0) rotateY(-180deg)",
          },
          "15%": {
            opacity: 0.4,
            transform: "scale3d(0.8, 1.7, 1.1)",
          },
          "100%": {
            opacity: 1,
            transform: "scale3d(1, 1, 1) translate3d(0, 0, 0)  rotateY(4deg)",
          },
        },
       
      },
      animation: {
        scale_first: 'scale_first 1s ease-out 0.5s 1',
        zoomOutDown: 'zoom-out-down 1s ease-out 0.25s 1',
        
      },
    },
  },
  plugins: [],
}

