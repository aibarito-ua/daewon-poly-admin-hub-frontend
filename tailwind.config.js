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
        // tab move buttons
        'svg-bt-left': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_left.svg')",
        'svg-bt-left-over': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_left_over.svg')",
        'svg-bt-left-disabled': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_left_disable.svg')",
        'svg-bt-right': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_right.svg')",
        'svg-bt-right-over': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_right_over.svg')",
        'svg-bt-right-disabled': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_right_disable.svg')",
        // portfolio view ic
        'svg-ic-portfolio': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_portfolio_view.svg')",
        // portfolio button
        'svg-bt-portfolio': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_portfolio.svg')",
        'svg-bt-portfolio-over': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_portfolio_over.svg')",
        // report button
        'svg-bt-go-report': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_report.svg')",
        'svg-bt-go-report-over': "url('/src/components/toggleModalComponents/reportLayouts/svgs/bt_report_over.svg')",
        // crown ic
        'svg-ic-crown': "url('/src/components/toggleModalComponents/reportLayouts/svgs/crown.svg')",
        // buttons
        'svg-bt-comment-add': "url('/src/util/svgs/buttons/bt_comments.svg')",
        'svg-bt-advisor': "url('/src/util/svgs/buttons/bt_advisor.svg')",
        'svg-bt-advisor-over': "url('/src/util/svgs/buttons/bt_advisor_over.svg')",
        'svg-bt-return': "url('/src/util/svgs/buttons/bt_return.svg')",
        'svg-bt-return-over': "url('/src/util/svgs/buttons/bt_return_over.svg')",
        'svg-bt-return-disable': "url('/src/util/svgs/buttons/bt_return_disable.svg')",
        'svg-bt-close': "url('/src/util/svgs/buttons/bt_close.svg')",
        'svg-bt-close-over': "url('/src/util/svgs/buttons/bt_close_over.svg')",
        'svg-bt-save': "url('/src/util/svgs/buttons/bt_save.svg')",
        'svg-bt-save-disabled': "url('/src/util/svgs/buttons/bt_save_disable.svg')",
        'svg-bt-save-over': "url('/src/util/svgs/buttons/bt_save_over.svg')",
        'svg-bt-send': "url('/src/util/svgs/buttons/bt_send.svg')",
        'svg-bt-send-disabled': "url('/src/util/svgs/buttons/bt_send_disable.svg')",
        'svg-bt-send-over': "url('/src/util/svgs/buttons/bt_send_over.svg')",
        // modal close
        'svg-btn-close': "url('/src/util/svgs/buttons/p_btn_close.svg')",
        // report button in 학습 관리
        'svg-bt-report-lm':"url('/src/util/svgs/buttons//writing/learningManagement/table/bt_report.svg')",
        // 돋보기
        'svg-bt-info-magnifying-glass-icon': "url('/src/util/svgs/buttons/bt_info.svg')",
        // final draft bottom buttons
        'svg-bt-create-report': "url('/src/util/svgs/buttons/bt_create_report.svg')",
        'svg-bt-create-report-over': "url('/src/util/svgs/buttons/bt_create_report_over.svg')",
        'svg-bt-create-report-disabled': "url('/src/util/svgs/buttons/bt_create_over.svg')",
        // pdf & print
        'svg-bt-pdf': "url('/src/util/svgs/buttons/bt_pdf.svg')",
        'svg-bt-print': "url('/src/util/svgs/buttons/bt_print.svg')",
        // report print
        'report-export-print-btn': "url('/src/components/commonComponents/customComponents/exportButtons/report/svgs/bt_print.svg')",
        'report-export-print-btn-over': "url('/src/components/commonComponents/customComponents/exportButtons/report/svgs/bt_print_over.svg')",
        // export 재료
        'svg-ic-writing':"url('/src/util/svgs/export/ic_wr_2.svg')",
        'report-ic-wr': "url('/src/components/commonComponents/customComponents/exportButtons/report/svgs/ic_wr.svg')",
        // report custom tooltips
        'report-rechart-custom-tooltip-box-organization': "url('/src/components/chartComponents/tooltips/polygons/reportTooltipOrganization.svg')",
        'report-rechart-custom-tooltip-box-voice': "url('/src/components/chartComponents/tooltips/polygons/reportTooltipVoice.svg')",
        'report-rechart-custom-tooltip-box-sentencefluency': "url('/src/components/chartComponents/tooltips/polygons/reportTooltipSentenceFluency.svg')",
        'report-rechart-custom-tooltip-box-wordchoice': "url('/src/components/chartComponents/tooltips/polygons/reportTooltipWordChoice.svg')",
        'report-rechart-custom-tooltip-box-ideas': "url('/src/components/chartComponents/tooltips/polygons/reportTooltipIdeas.svg')",
        'report-rechart-custom-tooltip-box-conventions': "url('/src/components/chartComponents/tooltips/polygons/reportTooltipConventions.svg')",
        // outline format type images
        'outline-format-image-ol-01': "url('/src/components/toggleModalComponents/outlineFormatModalImages/OL_01@3x.png')",
        'outline-format-image-ol-02': "url('/src/components/toggleModalComponents/outlineFormatModalImages/OL_02@3x.png')",
        'outline-format-image-ol-03': "url('/src/components/toggleModalComponents/outlineFormatModalImages/OL_03@3x.png')",
        'outline-format-image-ol-04': "url('/src/components/toggleModalComponents/outlineFormatModalImages/OL_04@3x.png')",

        // toast icon
        'toast-warning-ic': "url('/src/util/png/ic_warning_toast.png')",

        // report doughnut chart legends
        'report-doughnut-chart-legend-ideas': "url('/src/components/chartComponents/doughnutChartImages/legend_ideas.svg')",
        'report-doughnut-chart-legend-organization': "url('/src/components/chartComponents/doughnutChartImages/legend_organization.svg')",
        'report-doughnut-chart-legend-voice': "url('/src/components/chartComponents/doughnutChartImages/legend_voice.svg')",
        'report-doughnut-chart-legend-word-choice': "url('/src/components/chartComponents/doughnutChartImages/legend_word_choice.svg')",
        'report-doughnut-chart-legend-sentence-fluency': "url('/src/components/chartComponents/doughnutChartImages/legend_sentence_fluency.svg')",
        'report-doughnut-chart-legend-conventions': "url('/src/components/chartComponents/doughnutChartImages/legend_conventions.svg')",
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
