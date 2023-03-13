const includeHTML = function () {
  const includes = document.querySelectorAll('[data-include]')
  includes.forEach(function (el) {
    const file = el.getAttribute('data-include')
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        el.innerHTML = this.responseText
      }
    }
    xhttp.open('GET', file, true)
    xhttp.send()
  })
}
includeHTML()