/******GLOBAL EVENTS******/
window.onload = () => {
    cgpaDiv.style.display = "none"
    gpaDiv.style.display = "none"
}

const displayCGPA = () => {
    cgpaDiv.style.display = "block"
    cgpaButton.parentNode.classList.add("is-active")
    cgpaButton.style.backgroundColor = "black"
    gpaButton.parentNode.classList.remove("is-active")
    gpaButton.style.backgroundColor = "white"
    gpaDiv.style.display = "none"
}

const displayGPA = () => {
    cgpaDiv.style.display = "none"
    gpaButton.parentNode.classList.add("is-active")
    gpaButton.style.backgroundColor = "black"
    cgpaButton.parentNode.classList.remove("is-active")
    cgpaButton.style.backgroundColor = "white"
    gpaDiv.style.display = "block";
}

const cgpaDiv = document.querySelector(".cgpa")
const gpaDiv = document.querySelector(".gpa")

const cgpaButton = document.querySelector("a")
const gpaButton = document.querySelectorAll("a")[1]

cgpaButton.addEventListener("click", displayCGPA)
gpaButton.addEventListener("click", displayGPA)


/******CGPA******/
function validateGPA(gpa, sem) {
    console.log(gpa.value, typeof (gpa.value))
    gpaEntered = parseFloat(gpa.value)
    if (gpaEntered > 10) {
        alert("GPA can't be greater than 10")
        gpa.value = gpa.value.slice(0, gpa.value.length - 1)


    } else if (gpaEntered < 0) {
        alert("GPA can't be lesser than 0")
        gpa.value = ""

    } else if (gpa.value == "") {
        cgpaCalculateButton.disabled = true
        gpaValidator[sem - 1] = false;

    }
    else {
        gpaValidator[sem - 1] = true;

        console.log(cgpaCreditsValidator, gpaValidator)
        cgpaCalculateButton.disabled = !gpaValidator.every((value) => {
            return value == true
        }) || !cgpaCreditsValidator.every((value) => {
            return value == true
        })
    }
}

function validateSemCredits(credits, sem) {

    creditEntered = parseInt(credits.value)

    if (creditEntered < 0) {
        alert("Credits can't be lesser than 0")
        credits.value = ""
        cgpaCalculateButton.disabled = true
        cgpaCreditsValidator[sem - 1] = false
    }
    else if (credits.value == "") {
        cgpaCalculateButton.disabled = true
        cgpaCreditsValidator[sem - 1] = false
    }
    else {
        cgpaCreditsValidator[sem - 1] = true
        console.log(cgpaCreditsValidator, gpaValidator)
        cgpaCalculateButton.disabled = !cgpaCreditsValidator.every((value) => {
            return value == true
        }) || !gpaValidator.every((value) => {
            return value == true
        })

    }
}

let gpaArr = [];
const displaySemesterCount = () => {
    let semestersCompleted = selectSemesters.options[selectSemesters.selectedIndex].value

    gpaValidator.length = semestersCompleted
    gpaValidator.fill(false, 0, semestersCompleted)
    cgpaCreditsValidator.length = semestersCompleted
    cgpaCreditsValidator.fill(false, 0, semestersCompleted)


    cgpaCalculateButton.disabled = true

    const table = document.querySelector(".cgpa tbody");
    table.replaceChildren()

    let cgpaDisplay = cgpaDiv.childNodes[cgpaDiv.childNodes.length - 1]
    console.log(cgpaDisplay.nodeName)
    if (cgpaDisplay.nodeName == 'DIV') {
        cgpaDisplay.remove()
    }


    for (let sem = 1; sem <= semestersCompleted; sem += 1) {
        const tr = document.createElement("tr");
        tr.classList.add("columns")
        tr.classList.add("is-vcentered")
        tr.classList.add("is-centered")
        tr.classList.add("is-mobile")

        const label = document.createElement("b");
        label.innerHTML = `Semester ${sem}`
        label.classList.add("column")
        label.classList.add("is-4")

        const gpa = document.createElement("input");
        gpa.type = "number";
        gpa.placeholder = `Sem ${sem} GPA`
        gpa.min = "0"
        gpa.max = "10"
        gpa.step = "0.01"
        gpa.classList.add("input")
        gpa.classList.add("is-rounded")
        gpa.classList.add("is-small")
        gpa.classList.add('is-info')

        gpa.addEventListener("input", () => validateGPA(gpa, sem))
        gpaArr.push(gpa)

        const x = document.createElement("b")
        x.innerHTML = "x"

        const credits = document.createElement("input");
        credits.type = "number";
        credits.placeholder = `Sem ${sem} Credits`
        credits.min = "0"
        credits.step = "1"
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

            const plus = document.createElement("b")
            plus.innerHTML = "+"
            tr.appendChild(plus)

            table.appendChild(tr)
        }
        else {
            const calcBtn = document.createElement("tr");
            calcBtn.classList.add("columns")
            calcBtn.classList.add("is-vcentered")
            calcBtn.classList.add("is-centered")
            calcBtn.classList.add("is-mobile")

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
    result.style.marginTop = "10px"


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
    actualResult.classList.add("is-success")
    actualResult.style.width = "100px"
    actualResult.style.height = "40px"
    actualResult.style.fontSize = "15px"

    resultTag.appendChild(actualResult)

    const resultText = cgp / (totalCredits * 1.0)
    actualResult.innerHTML = `${resultText.toFixed(3)} / 10`

    cgpaDiv.appendChild(result)

}

const cgpaCalculateButton = document.createElement("button");
cgpaCalculateButton.disabled = true;
cgpaCalculateButton.classList.add("button")
cgpaCalculateButton.classList.add("is-info")
cgpaCalculateButton.classList.add("is-outlined")
cgpaCalculateButton.addEventListener("click", calculateCGPA)


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


function validateSubjectCredits(credits, count) {

    creditEntered = parseInt(credits.value)

    if (creditEntered < 0) {
        alert("Credits can't be lesser than 0")
        credits.value = ""
        gpaCalculateButton.disabled = true
        gpaCreditsValidator[count - 1] = false
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
        return
    }

    let subjectsCount = parseInt(noOfSubjects.value)

    gradeValidator.length = subjectsCount
    gradeValidator.fill(false, 0, subjectsCount)
    gpaCreditsValidator.length = subjectsCount
    gpaCreditsValidator.fill(false, 0, subjectsCount)

    gpaCalculateButton.disabled = true


    if (subjectsCount > 70) {
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

        const label = document.createElement("b");
        label.innerHTML = `Subject ${count}`;
        label.classList.add("column")
        label.classList.add("is-3")

        const gradeDiv = document.createElement("div")
        gradeDiv.classList.add("select")
        gradeDiv.classList.add("is-info")
        gradeDiv.classList.add("is-rounded")
        gradeDiv.classList.add("is-small")

        const grade = document.createElement("select");
        // grade.classList.add("form-select")
        // grade.ariaLabel = "Default select example"

        const optionSelect = document.createElement("option")
        optionSelect.innerHTML = `Subject ${count} Grade`
        optionSelect.style.display = "none"

        const optionS = document.createElement("option");
        optionS.innerHTML = `S Grade`;

        const optionA = document.createElement("option");
        optionA.innerHTML = `A Grade`;

        const optionB = document.createElement("option");
        optionB.innerHTML = `B Grade`;

        const optionC = document.createElement("option");
        optionC.innerHTML = `C Grade`;

        const optionD = document.createElement("option");
        optionD.innerHTML = `D Grade`;

        grade.appendChild(optionSelect)
        grade.appendChild(optionS)
        grade.appendChild(optionA)
        grade.appendChild(optionB)
        grade.appendChild(optionC)
        grade.appendChild(optionD)

        grade.addEventListener("change", () => validateGrade(grade, count))
        // grade.type = "text";
        // grade.placeholder = `Grade in Subject ${count}`
        // grade.minLength = "1"
        // grade.maxLength = "1"

        gradeDiv.appendChild(grade)


        const x = document.createElement("b")
        x.innerHTML = "x"

        const credits = document.createElement("input");
        credits.type = "number";
        credits.placeholder = `Subject ${count} Credits`
        credits.min = "0"
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

            const plus = document.createElement("b")
            plus.innerHTML = "+"
            tr.appendChild(plus)

            table.appendChild(tr)
        }
        else {
            const calcBtn = document.createElement("tr");

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

    let gpa = 0.0, totalCredits = 0.0
    for (let subject = 0; subject < subjectRow.length; subject += 1) {

        let [label, selectDiv, b, input] = subjectRow[subject].childNodes
        let select = selectDiv.firstChild
        let grade = select.options[select.selectedIndex].value
        let credits = parseFloat(input.value)

        switch (grade) {
            case "S Grade":
                grade = 10
                break;

            case "A Grade":
                grade = 9
                break;

            case "B Grade":
                grade = 8
                break;

            case "C Grade":
                grade = 7
                break;

            case "D Grade":
                grade = 6
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
    result.style.marginTop = "10px"


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
    actualResult.classList.add("is-success")
    actualResult.style.width = "100px"
    actualResult.style.height = "40px"
    actualResult.style.fontSize = "15px"

    resultTag.appendChild(actualResult)

    const resultText = gpa / (totalCredits * 1.0)
    actualResult.innerHTML = `${resultText.toFixed(3)}/10`
    gpaDiv.appendChild(result)

}

let gpaCalculateButton = document.createElement("button")
gpaCalculateButton.disabled = true
gpaCalculateButton.classList.add("button")
gpaCalculateButton.classList.add("is-info")
gpaCalculateButton.classList.add("is-outlined")
gpaCalculateButton.classList.add("is-mobile")
gpaCalculateButton.addEventListener("click", () => calculateGPA())
