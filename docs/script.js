const copyButtons = document.querySelectorAll("[data-copy-target]")
const tabGroups = document.querySelectorAll("[data-tabs]")
const expandableCards = document.querySelectorAll("[data-expandable]")

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.getAttribute("data-copy-target")
    const target = targetId ? document.getElementById(targetId) : null

    if (!target) {
      return
    }

    try {
      await navigator.clipboard.writeText(target.textContent ?? "")
      const original = button.textContent
      button.textContent = "Copied"
      window.setTimeout(() => {
        button.textContent = original
      }, 1200)
    } catch {
      button.textContent = "Failed"
      window.setTimeout(() => {
        button.textContent = "Copy"
      }, 1200)
    }
  })
})

tabGroups.forEach((group) => {
  const buttons = group.querySelectorAll(".tab-button")
  const panels = group.querySelectorAll(".tab-panel")

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.getAttribute("data-tab")

      buttons.forEach((item) => item.classList.remove("is-active"))
      panels.forEach((panel) => panel.classList.remove("is-active"))

      button.classList.add("is-active")
      group.querySelector(`[data-panel="${tab}"]`)?.classList.add("is-active")
    })
  })
})

expandableCards.forEach((card) => {
  const toggle = card.querySelector("[data-toggle]")

  toggle?.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open")
    toggle.textContent = isOpen ? "Collapse" : "Expand"
  })
})
