/******GLOBAL EVENTS******/
window.onload = () => {
    cgpaDiv.style.display = "none"
    gpaDiv.style.display = "none"

    cgpaNote.style.display = "none"
    gpaNote.style.display = "none"
}

const displayCGPA = () => {
    cgpaDiv.style.display = "block"
    cgpaNote.style.display = "block"


    // cgpaNote.parentNode.style.listStyleType = "circle"

    cgpaButton.parentNode.classList.add("is-active")
    cgpaButton.style.backgroundColor = "black"
    gpaButton.parentNode.classList.remove("is-active")
    gpaButton.style.backgroundColor = "white"

    gpaDiv.style.display = "none"
    gpaNote.style.display = "none"
}

const displayGPA = () => {
    cgpaDiv.style.display = "none"
    cgpaNote.style.display = "none"

    gpaButton.parentNode.classList.add("is-active")
    gpaButton.style.backgroundColor = "black"
    cgpaButton.parentNode.classList.remove("is-active")
    cgpaButton.style.backgroundColor = "white"

    gpaDiv.style.display = "block";
    gpaNote.style.display = "block"
}

const cgpaDiv = document.querySelector(".cgpa")
const gpaDiv = document.querySelector(".gpa")

const cgpaNote = document.querySelector(".cgpaNote")
const gpaNote = document.querySelector(".gpaNote")

const cgpaTable = document.querySelector("#cgpaTable")
const gpaTable = document.querySelector("#gpaTable")

const cgpaButton = document.querySelector("a")
const gpaButton = document.querySelectorAll("a")[1]

cgpaButton.addEventListener("click", displayCGPA)
gpaButton.addEventListener("click", displayGPA)


/******CGPA******/
let previousCGPATyped = ""
function validateGPA(gpa, sem) {
    console.log(gpa.value, typeof (gpa.value))

    gpaEntered = parseFloat(gpa.value)
    console.log(gpaEntered)
    if (gpaEntered > 10) {
        alert("GPA can't be greater than 10")
        gpa.value = previousCGPATyped


    } else if (gpaEntered < 0) {
        alert("GPA can't be lesser than 0")
        gpa.value = ""

    } else if (gpa.value == "") {
        cgpaCalculateButton.disabled = true
        gpaValidator[sem - 1] = false;

    }
    else {
        gpaValidator[sem - 1] = true;

        console.log(cgpaCreditsValidator, gpaValidator, totalCreditsValidator)
        cgpaCalculateButton.disabled = !gpaValidator.every((value) => {
            return value == true
        }) || !cgpaCreditsValidator.every((value) => {
            return value == true
        }) || !totalCreditsValidator
    }

    previousCGPATyped = gpa.value
}

let previousCreditTyped = ""
function validateSemCredits(credits, sem) {

    credits.value = credits.value.replace(/[^0-9]/g, '')


    creditEntered = parseInt(credits.value)

    if (creditEntered < 0) {
        alert("Credits can't be lesser than 0")
        credits.value = ""
        cgpaCalculateButton.disabled = true
        cgpaCreditsValidator[sem - 1] = false
    }
    else if (creditEntered > 200) {
        credits.value = previousCreditTyped
    }
    else if (credits.value == "") {
        cgpaCalculateButton.disabled = true
        cgpaCreditsValidator[sem - 1] = false
    }
    else {
        cgpaCreditsValidator[sem - 1] = true
        console.log(cgpaCreditsValidator, gpaValidator, totalCreditsValidator)
        cgpaCalculateButton.disabled = !cgpaCreditsValidator.every((value) => {
            return value == true
        }) || !gpaValidator.every((value) => {
            return value == true
        }) || !totalCreditsValidator

    }
    let creditsInputFields = document.getElementsByClassName("cgpaCredits")
    console.log(creditsInputFields)
    totalCreditsValue = 0
    for (let count = 0; count < creditsInputFields.length; count++) {

        let value = parseInt(creditsInputFields[count].value)
        if (!isNaN(value)) {
            totalCreditsValue += value
        }
    }
    totalCreditsInput.value = totalCreditsValue


    previousCreditTyped = credits.value
}

let totalCreditsValue = 0

let previousTotalCreditTyped = 0
function validateTotalCredits(totalCredits) {


    totalCredits.value = totalCredits.value.replace(/[^0-9]/g, '')

    creditEntered = parseInt(totalCredits.value)

    if (creditEntered < 0) {
        alert("Total Credits can't be lesser than 0")
        totalCredits.value = ""
        cgpaCalculateButton.disabled = true
    }
    else if (creditEntered > 200) {
        totalCredits.value = previousTotalCreditTyped
    }
    else if (totalCredits.value == "") {
        cgpaCalculateButton.disabled = true
        totalCreditsValidator = false
    } else if (totalCreditsValue < totalCredits.value) {
        alert("Total Enrolled Credits can't be Greater than the\nSum of all the credits in all the semester\nIt can either be less than or equal to it")
        totalCredits.value = previousTotalCreditTyped
    }
    else {
        console.log(cgpaCreditsValidator, gpaValidator, totalCreditsValidator)
        totalCreditsValidator = true
        cgpaCalculateButton.disabled = !totalCreditsValidator || !cgpaCreditsValidator.every((value) => {
            return value == true
        }) || !gpaValidator.every((value) => {
            return value == true
        })

    }

    previousTotalCreditTyped = totalCredits.value

}

let gpaArr = [];
const displaySemesterCount = () => {
    let semestersCompleted = selectSemesters.options[selectSemesters.selectedIndex].value

    gpaValidator.length = semestersCompleted
    gpaValidator.fill(false, 0, semestersCompleted)
    cgpaCreditsValidator.length = semestersCompleted
    cgpaCreditsValidator.fill(false, 0, semestersCompleted)

    totalCreditsValidator = true


    cgpaCalculateButton.disabled = true

    const table = document.querySelector(".cgpa tbody");
    // for (let i = 0; i < 8; i++) {
    //     if (i <= parseInt(semestersCompleted)) {

    //     } else {
    //         console.log(i, semestersCompleted, table.childNodes)
    //         if (i <= table.childNodes.length) {
    //             table.childNodes[i].remove()
    //         }
    //     }
    // }
    table.replaceChildren()

    let cgpaDisplay = cgpaDiv.childNodes[cgpaDiv.childNodes.length - 1]
    console.log(cgpaDisplay.nodeName)
    if (cgpaDisplay.nodeName == 'DIV') {
        cgpaDisplay.remove()
    }


    cgpaTable.style.border = "2px solid black"

    for (let sem = 1; sem <= semestersCompleted; sem += 1) {
        const tr = document.createElement("tr");
        tr.classList.add("columns")
        tr.classList.add("is-vcentered")
        tr.classList.add("is-centered")
        tr.classList.add("is-mobile")
        tr.style.margin = "0px"

        const label = document.createElement("b");
        label.innerHTML = `Semester ${sem}: `
        label.classList.add("column")
        label.classList.add("is-4")
        label.style.padding = "0px"

        const gpa = document.createElement("input");
        gpa.type = "number";
        gpa.placeholder = `GPA`
        gpa.min = "0"
        gpa.max = "10"
        gpa.step = "0.01"
        gpa.classList.add("input")
        gpa.classList.add("is-rounded")
        gpa.classList.add("column")
        gpa.classList.add("is-3")
        gpa.classList.add("is-small")
        gpa.classList.add('is-info')

        gpa.addEventListener("input", () => validateGPA(gpa, sem))
        gpaArr.push(gpa)

        const x = document.createElement("b")
        x.innerHTML = "×"

        const credits = document.createElement("input");
        credits.type = "text";
        credits.placeholder = `Enrolled Credits`
        credits.classList.add("cgpaCredits")
        credits.classList.add("column")
        credits.classList.add("is-4")
        credits.classList.add("input")
        credits.classList.add("is-rounded")
        credits.classList.add("is-small")
        credits.classList.add('is-info')
        credits.addEventListener("input", () => validateSemCredits(credits, sem))


        tr.appendChild(label)
        tr.appendChild(gpa)
        tr.appendChild(x)
        tr.appendChild(credits)
        tr.classList.add('cgpaList')

        table.appendChild(tr);

        if (sem != semestersCompleted) {
            const tr = document.createElement("tr");
            tr.classList.add("columns")
            tr.classList.add("is-vcentered")
            tr.classList.add("is-centered")
            tr.classList.add("is-mobile")
            tr.style.margin = "0px"

            const plus = document.createElement("b")
            plus.style.marginLeft = "25%"
            plus.innerHTML = "+"
            tr.appendChild(plus)

            table.appendChild(tr)
        }
        else {
            const line = document.createElement("hr")
            line.style.border = "2px solid black"
            line.style.backgroundColor = "black"
            table.appendChild(line)

            const totalCreditsRow = document.createElement("tr")

            totalCreditsRow.classList.add("columns")
            totalCreditsRow.classList.add("is-vcentered")
            totalCreditsRow.classList.add("is-centered")
            totalCreditsRow.classList.add("is-mobile")
            totalCreditsRow.style.margin = "0px"

            totalCreditsLabel.innerHTML = `Total Credits Enrolled: `
            totalCreditsInput.value = 0

            totalCreditsRow.appendChild(totalCreditsLabel)
            totalCreditsRow.appendChild(totalCreditsInput)
            table.appendChild(totalCreditsRow)
            table.appendChild(totalCreditsNote)

            const calcBtn = document.createElement("tr");
            calcBtn.classList.add("columns")
            calcBtn.classList.add("is-vcentered")
            calcBtn.classList.add("is-centered")
            calcBtn.classList.add("is-mobile")
            calcBtn.style.margin = "20px"


            cgpaCalculateButton.innerHTML = "Calculate CGPA"
            calcBtn.appendChild(cgpaCalculateButton)
            table.appendChild(calcBtn)
        }
    }


}
const selectSemesters = document.querySelector("select");
selectSemesters.addEventListener("change", displaySemesterCount)
let gpaValidator = [], cgpaCreditsValidator = []

const calculateCGPA = () => {

    const semesterRow = document.querySelectorAll(".cgpaList");

    let cgp = 0.0, totalCredits = 0.0;
    for (let sem = 0; sem < semesterRow.length; sem += 1) {
        const [label, gpa, x, credits] = semesterRow[sem].childNodes
        console.log(semesterRow[sem].childNodes)
        cgp += parseFloat(gpa.value) * parseFloat(credits.value)
        totalCredits += parseFloat(credits.value)
    }

    let cgpaDisplay = cgpaDiv.childNodes[cgpaDiv.childNodes.length - 1]
    console.log(cgpaDisplay.nodeName)
    if (cgpaDisplay.nodeName == 'DIV') {
        cgpaDisplay.remove()
    }



    const result = document.createElement("div");
    result.classList.add("control")
    result.classList.add("columns")
    result.classList.add("is-vcentered")
    result.classList.add("is-centered")
    result.classList.add("is-mobile")
    result.style.marginTop = "20px"


    const resultTag = document.createElement("div")
    resultTag.classList.add("tags")
    resultTag.classList.add("has-addons")

    result.appendChild(resultTag)

    const resultSpan = document.createElement("span")
    resultSpan.classList.add("tag")
    resultSpan.classList.add("is-dark")
    resultSpan.innerHTML = "Your CGPA is "
    resultSpan.style.width = "100px"
    resultSpan.style.height = "40px"
    resultSpan.style.fontSize = "15px"

    resultTag.appendChild(resultSpan)

    const actualResult = document.createElement("span")
    actualResult.classList.add("tag")
    actualResult.classList.add("is-info")
    actualResult.style.width = "100px"
    actualResult.style.height = "40px"
    actualResult.style.fontSize = "15px"

    resultTag.appendChild(actualResult)

    let actualTotalCredits = totalCreditsInput.value
    const resultText = cgp / (actualTotalCredits * 1.0)
    console.log(resultText)
    if (isNaN(resultText)) {
        alert("Incorrect value found")
        actualResult.innerHTML = `- / 10`

    } else {
        actualResult.innerHTML = `${resultText.toFixed(3)} / 10`

    }

    cgpaDiv.appendChild(result)

}

const cgpaCalculateButton = document.createElement("button");
cgpaCalculateButton.disabled = true;
cgpaCalculateButton.classList.add("button")
cgpaCalculateButton.classList.add("is-info")
cgpaCalculateButton.classList.add("is-outlined")
cgpaCalculateButton.addEventListener("click", calculateCGPA)


let totalCreditsLabel = document.createElement("b")
totalCreditsLabel.classList.add("column")
totalCreditsLabel.classList.add("is-6")

let totalCreditsInput = document.createElement("input")
totalCreditsInput.type = "text";
totalCreditsInput.placeholder = "Total Credits"
totalCreditsInput.classList.add("input")
totalCreditsInput.classList.add("column")
totalCreditsInput.classList.add("is-rounded")
totalCreditsInput.classList.add("is-small")
totalCreditsInput.classList.add('is-info')
totalCreditsInput.classList.add("is-4")
totalCreditsInput.addEventListener("input", () => validateTotalCredits(totalCreditsInput))

let totalCreditsValidator = true

let totalCreditsNote = document.createElement("b")
totalCreditsNote.innerHTML = "(Change if you have/had backlogs)"


/*****GPA******/

function validateGrade(grade, count) {

    gradeSelected = grade.options[grade.selectedIndex].value
    console.log(gradeSelected)
    if (gradeSelected.includes('Grade in Subject')) {

        gpaCalculateButton.disabled = true
        gradeValidator[count - 1] = false
    }
    else {
        gradeValidator[count - 1] = true
        console.log(gpaCreditsValidator, gradeValidator, !gradeValidator.every((value) => {
            value == true
        }))
        gpaCalculateButton.disabled = !gradeValidator.every((value) => {
            return value == true
        }) || !gpaCreditsValidator.every((value) => {
            return value == true
        })
    }

}

let previousCreditTyped1 = ""
function validateSubjectCredits(credits, count) {

    credits.value = credits.value.replace(/[^0-9]/g, '')

    creditEntered = parseInt(credits.value)

    if (creditEntered < 0) {
        alert("Credits can't be lesser than 0")
        credits.value = ""
        gpaCalculateButton.disabled = true
        gpaCreditsValidator[count - 1] = false
    }
    else if (creditEntered > 200) {
        credits.value = previousCreditTyped1
    }
    else if (credits.value == "") {
        gpaCalculateButton.disabled = true
        gpaCreditsValidator[count - 1] = false
    }
    else {
        gpaCreditsValidator[count - 1] = true
        console.log(gpaCreditsValidator, gradeValidator)
        gpaCalculateButton.disabled = !gpaCreditsValidator.every((value) => {
            return value == true
        }) || !gradeValidator.every((value) => {
            return value == true
        })
    }

    let creditsInputFields = document.getElementsByClassName("gpaCredits")
    console.log(creditsInputFields)
    let totalCredits = 0
    for (let count = 0; count < creditsInputFields.length; count++) {

        let value = parseInt(creditsInputFields[count].value)
        console.log(value)
        if (!isNaN(value)) {
            totalCredits += value
        }
    }
    totalCreditsLabel1.innerHTML = `Total Credits: ${totalCredits}`



    previousCreditTyped1 = credits.value
}

const displaySubjectsCount = () => {

    const table = document.querySelectorAll("tbody")[1];
    table.replaceChildren()

    let gpaDisplay = gpaDiv.childNodes[gpaDiv.childNodes.length - 1]
    console.log(gpaDisplay.nodeName)
    if (gpaDisplay.nodeName == 'DIV') {
        gpaDisplay.remove()
    }
    if (noOfSubjects.value == "") {

        gpaTable.style.border = "0px"
        return
    } else {

        gpaTable.style.border = "2px solid black"
    }

    let subjectsCount = parseInt(noOfSubjects.value)

    gradeValidator.length = subjectsCount
    gradeValidator.fill(false, 0, subjectsCount)
    gpaCreditsValidator.length = subjectsCount
    gpaCreditsValidator.fill(false, 0, subjectsCount)

    gpaCalculateButton.disabled = true




    if (subjectsCount > 100) {
        alert(`Did you really write ${subjectsCount} subjects in one semester?\nGreat! But sorry this app is NOT efficient enough to do that`)
        noOfSubjects.value = ""
        return
    }
    for (let count = 1; count <= subjectsCount; count += 1) {
        const tr = document.createElement("tr");
        tr.classList.add("columns")
        tr.classList.add("is-vcentered")
        tr.classList.add("is-centered")
        tr.classList.add("is-mobile")
        tr.style.margin = "0px"

        const label = document.createElement("b");
        label.innerHTML = `Subject ${count}: `;
        label.classList.add("column")
        label.classList.add("is-4")
        label.style.padding = "0px"

        const gradeDiv = document.createElement("div")
        gradeDiv.classList.add("select")
        gradeDiv.classList.add("is-info")
        gradeDiv.classList.add("is-rounded")
        gradeDiv.classList.add("is-small")

        const grade = document.createElement("select");
        // grade.classList.add("form-select")
        // grade.ariaLabel = "Default select example"

        const optionSelect = document.createElement("option")
        optionSelect.innerHTML = `Grade`
        optionSelect.style.display = "none"

        const optionS = document.createElement("option");
        optionS.innerHTML = `S Grade(10)`;

        const optionA = document.createElement("option");
        optionA.innerHTML = `A Grade(9)`;

        const optionB = document.createElement("option");
        optionB.innerHTML = `B Grade(8)`;

        const optionC = document.createElement("option");
        optionC.innerHTML = `C Grade(7)`;

        const optionD = document.createElement("option");
        optionD.innerHTML = `D Grade(6)`;

        const optionU = document.createElement("option");
        optionU.innerHTML = `U Grade(0)`;

        grade.appendChild(optionSelect)
        grade.appendChild(optionS)
        grade.appendChild(optionA)
        grade.appendChild(optionB)
        grade.appendChild(optionC)
        grade.appendChild(optionD)
        grade.appendChild(optionU)

        grade.addEventListener("change", () => validateGrade(grade, count))
        // grade.type = "text";
        // grade.placeholder = `Grade in Subject ${count}`
        // grade.minLength = "1"
        // grade.maxLength = "1"

        gradeDiv.appendChild(grade)


        const x = document.createElement("b")
        x.innerHTML = "×"

        const credits = document.createElement("input");
        credits.type = "text";
        credits.placeholder = `Credits`
        credits.min = "0"
        credits.classList.add("gpaCredits")
        credits.classList.add("column")
        credits.classList.add("is-3")
        credits.classList.add("input")
        credits.classList.add("is-rounded")
        credits.classList.add("is-small")
        credits.classList.add('is-info')

        credits.addEventListener('input', () => validateSubjectCredits(credits, count))

        tr.appendChild(label)
        tr.appendChild(gradeDiv)
        tr.appendChild(x)
        tr.appendChild(credits)
        tr.classList.add("gpaList")
        table.appendChild(tr);

        if (count != subjectsCount) {
            const tr = document.createElement("tr");
            tr.classList.add("columns")
            tr.classList.add("is-vcentered")
            tr.classList.add("is-centered")
            tr.classList.add("is-mobile")
            tr.style.margin = "0px"

            const plus = document.createElement("b")
            plus.style.marginLeft = "38%"
            plus.innerHTML = "+"
            tr.appendChild(plus)

            table.appendChild(tr)
        }
        else {
            const line = document.createElement("hr")
            line.style.border = "2px solid black"
            line.style.backgroundColor = "black"
            table.appendChild(line)

            const totalCreditsRow = document.createElement("tr")

            totalCreditsLabel1.innerHTML = `Total Credits: 0`
            totalCreditsRow.appendChild(totalCreditsLabel1)
            table.appendChild(totalCreditsRow)

            const calcBtn = document.createElement("tr");
            calcBtn.classList.add("columns")
            calcBtn.classList.add("is-vcentered")
            calcBtn.classList.add("is-centered")
            calcBtn.classList.add("is-mobile")
            calcBtn.style.margin = "20px"

            gpaCalculateButton.innerHTML = "Calculate GPA"
            calcBtn.appendChild(gpaCalculateButton)
            table.appendChild(calcBtn)
        }
    }
}

const noOfSubjects = document.querySelector("input")
noOfSubjects.addEventListener("input", displaySubjectsCount)
let gradeValidator = [], gpaCreditsValidator = []


function calculateGPA() {

    let subjectRow = document.querySelectorAll(".gpaList")

    let gpa = 0.0, totalCredits = 0.0, resultFlag = false
    for (let subject = 0; subject < subjectRow.length; subject += 1) {

        let [label, selectDiv, b, input] = subjectRow[subject].childNodes
        let select = selectDiv.firstChild
        let grade = select.options[select.selectedIndex].value
        let credits = parseFloat(input.value)

        switch (grade) {
            case "S Grade(10)":
                grade = 10
                break;

            case "A Grade(9)":
                grade = 9
                break;

            case "B Grade(8)":
                grade = 8
                break;

            case "C Grade(7)":
                grade = 7
                break;

            case "D Grade(6)":
                grade = 6
                break;

            case "U Grade(0)":
                grade = 0
                resultFlag = true
                break;

            default:
                break;
        }
        console.log(grade, credits)
        gpa += parseFloat(grade) * credits
        totalCredits += credits

    }

    let gpaDisplay = gpaDiv.childNodes[gpaDiv.childNodes.length - 1]

    console.log(gpaDiv.childNodes)
    if (gpaDisplay.nodeName == 'DIV') {
        gpaDisplay.remove()
    }

    const result = document.createElement("div");
    result.classList.add("control")
    result.classList.add("columns")
    result.classList.add("is-vcentered")
    result.classList.add("is-centered")
    result.classList.add("is-mobile")
    result.style.marginTop = "20px"


    const resultTag = document.createElement("div")
    resultTag.classList.add("tags")
    resultTag.classList.add("has-addons")

    result.appendChild(resultTag)

    const resultSpan = document.createElement("span")
    resultSpan.classList.add("tag")
    resultSpan.classList.add("is-dark")
    resultSpan.innerHTML = "Your GPA is "
    resultSpan.style.width = "100px"
    resultSpan.style.height = "40px"
    resultSpan.style.fontSize = "15px"

    resultTag.appendChild(resultSpan)

    const actualResult = document.createElement("span")
    actualResult.classList.add("tag")
    actualResult.classList.add("is-success")
    actualResult.style.width = "100px"
    actualResult.style.height = "40px"
    actualResult.style.fontSize = "15px"

    resultTag.appendChild(actualResult)

    const resultText = gpa / (totalCredits * 1.0)
    if (isNaN(resultText)) {
        alert("Incorrect value found")
        actualResult.innerHTML = `- / 10`

    } else if (resultFlag || resultText < 6) {
        actualResult.classList.remove("is-success")
        actualResult.classList.add("is-danger")
        actualResult.innerHTML = `${resultText.toFixed(3)} / 10`

    } else {

        actualResult.innerHTML = `${resultText.toFixed(3)} / 10`
    }
    gpaDiv.appendChild(result)

}

let gpaCalculateButton = document.createElement("button")
gpaCalculateButton.disabled = true
gpaCalculateButton.classList.add("button")
gpaCalculateButton.classList.add("is-info")
gpaCalculateButton.classList.add("is-outlined")
gpaCalculateButton.classList.add("is-mobile")
gpaCalculateButton.addEventListener("click", () => calculateGPA())

let totalCreditsLabel1 = document.createElement("b")
