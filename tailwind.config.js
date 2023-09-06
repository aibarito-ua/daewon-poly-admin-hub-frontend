module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    extend: {
      backgroundImage: {
        'outline-box-img': "url('/src/util/png/textKeyBox.png')",
        'outline-white-box': "url('/src/util/png/outlineTextSubBox.png)",
        // draft table buttons
        
        'svg-bt-correct': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_correct.svg')",
        'svg-bt-correct-over': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_correct_over.svg')",
        'svg-bt-correct-save': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_correct_save.svg')",
        'svg-bt-correct-save-over': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_correct_save_over.svg')",
        'svg-bt-done': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_done.svg')",
        'svg-bt-done-over': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_done_over.svg')",
        'svg-bt-returned': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_returned.svg')",
        'svg-bt-returned-over': "url('/src/util/svgs/buttons/writing/learningManagement/table/bt_returned_over.svg')",
        // buttons
        'svg-bt-comment-add': "url('/src/util/svgs/buttons/bt_comments.svg')",
        'svg-bt-advisor': "url('/src/util/svgs/buttons/bt_advisor.svg')",
        'svg-bt-advisor-over': "url('/src/util/svgs/buttons/bt_advisor_over.svg')",
        'svg-bt-return': "url('/src/util/svgs/buttons/bt_return.svg')",
        'svg-bt-return-over': "url('/src/util/svgs/buttons/bt_return_over.svg')",
        'svg-bt-close': "url('/src/util/svgs/buttons/bt_close.svg')",
        'svg-bt-close-over': "url('/src/util/svgs/buttons/bt_close_over.svg')",
        'svg-bt-save': "url('/src/util/svgs/buttons/bt_save.svg')",
        'svg-bt-save-disabled': "url('/src/util/svgs/buttons/bt_save_disable.svg')",
        'svg-bt-save-over': "url('/src/util/svgs/buttons/bt_save_over.svg')",
        'svg-bt-send': "url('/src/util/svgs/buttons/bt_send.svg')",
        'svg-bt-send-disabled': "url('/src/util/svgs/buttons/bt_send_disable.svg')",
        'svg-bt-send-over': "url('/src/util/svgs/buttons/bt_send_over.svg')",
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      'full': '100%'
    },
  }
}
