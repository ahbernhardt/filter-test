import React, { useState } from 'react'
import useMarketo from 'src/utils/useMarketo'

// function destyleMktoForm(mktoForm, moreStyles) {
//   const formEl = mktoForm.getFormElem()[0],
//     arrayify = getSelection.call.bind([].slice)
//
//   // remove element styles from <form> and children
//   const styledEls = arrayify(formEl.querySelectorAll("[style]")).concat(formEl)
//   styledEls.forEach(function (el) {
//     el.removeAttribute("style")
//   })

// disable remote stylesheets and local styles
// const styleSheets = arrayify(document.styleSheets)
// styleSheets.forEach(function (ss) {
//   if (
//     [mktoForms2BaseStyle, mktoForms2ThemeStyle].indexOf(ss.ownerNode) != -1 ||
//     formEl.contains(ss.ownerNode)
//   ) {
//     ss.disabled = true
//   }
// })

// if (!moreStyles) {
//   formEl.setAttribute("data-styles-ready", "true")
//   // console.log('Styles ready at: ' + performance.now());
// }
// }

function MarketoForm (props) {
  const [formLoading, setFormLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  useMarketo({
    baseUrl: '//events.wolveslynx.com',
    munchkinId: '055-RNL-339',
    formId: `${props.form_id}`,
    callback: function (form) {
      form.onSuccess(() => {
        form.getFormElem().hide()
        setSubmitted(true)
        return false
      })
      setFormLoading(false)
    },
  })

  return formLoading ? (
    <p className="uppercase text-center">loading...</p>
  ) : !formLoading && !submitted ? (
    <form id={`mktoForm_${props.form_id}`}/>
  ) : !formLoading && submitted ? (
    <p>
      Thank you! Keep an eye on your inbox to be the first to know when single
      game tickets go on sale.
    </p>
  ) : null
}

export default React.memo(MarketoForm)
