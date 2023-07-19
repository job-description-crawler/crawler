const getRequirements = async (newPage, link, countMap) => {
  await newPage.goto(link, {
    waitUntil: "networkidle2",
  })

  await newPage.waitForSelector(".JobHeader_className__HttDA")

  const relevantTexts = await newPage.$$eval("h6", headers => {
    let texts = []

    for (let header of headers) {
      if (
        header.textContent === "자격요건" ||
        header.textContent === "우대사항"
      ) {
        let spanText =
          header.nextElementSibling.querySelector("span").textContent

        texts.push(spanText)
      }
    }

    return texts
  })

  for (let text of relevantTexts) {
    const matches = text.match(/[a-zA-Z0-9#.]+/g)
    if (matches) {
      for (let match of matches) {
        const upperMatch = match.toUpperCase()
        const count = countMap.get(upperMatch) || 0
        countMap.set(upperMatch, count + 1)
      }
    }
  }

  console.log(Array.from(countMap.entries()))
}

export default getRequirements