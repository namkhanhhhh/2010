// Import jQuery
const $ = window.jQuery

// Shows hint when hover
$(() => {
  $('[data-toggle="tooltip"]').tooltip()
})

// Track the number of incorrect attempts
let incorrectAttempts = 0

document.querySelector("button").addEventListener("click", () => {
  var password = document.querySelector("input").value

  if (password === "2010") {
    window.location.href = "ConnectionPage.html"
  } else {
    incorrectAttempts++

    // Reset the counter after 3 attempts to start the cycle over
    if (incorrectAttempts > 3) {
      incorrectAttempts = 1
    }

    switch (incorrectAttempts) {
      case 1:
        alert("Hôm nay là ngày gì á ??")
        break
      case 2:
        alert("Viết liền không dấu nhá !! (Ngày tháng thui)")
        break
      case 3:
        alert("Ngày phụ nữ Việt Nam...")
        break
    }
  }
})
