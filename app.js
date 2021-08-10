/******GLOBAL EVENTS******/
window.onload = () => {
    cgpaDiv.style.display = "none"
    gpaDiv.style.display = "none"
}

const displayCGPA = () => {
    cgpaDiv.style.display = "block"
    gpaDiv.style.display = "none"
}

const displayGPA = () => {
    cgpaDiv.style.display = "none"
    gpaDiv.style.display = "block";
}

const cgpaDiv = document.querySelector(".cgpa")
const gpaDiv = document.querySelector(".gpa")

const cgpa = document.querySelector("button")
const gpa = document.querySelectorAll("button")[1]

cgpa.addEventListener("click", displayCGPA)
gpa.addEventListener("click", displayGPA)


/******CGPA******/
const displaySemesterCount = () => {
    let semestersCompleted = selectSemesters.options[selectSemesters.selectedIndex].value

    const table = document.querySelector("tbody");
    table.replaceChildren()
    for (let sem = 1; sem <= semestersCompleted; sem += 1) {
        const tr = document.createElement("tr");

        const label = document.createElement("label");
        label.innerHTML = `Semester ${sem}`

        const gpa = document.createElement("input");
        gpa.type = "number";
        gpa.placeholder = `GPA in Sem ${sem}`
        gpa.min = "0"
        gpa.max = "10"
        gpa.step = "0.01"

        const x = document.createElement("b")
        x.innerHTML = "x"

        const credits = document.createElement("input");
        credits.type = "number";
        credits.placeholder = `Credits in Sem ${sem}`
        credits.min = "0"


        tr.appendChild(label)
        tr.appendChild(gpa)
        tr.appendChild(x)
        tr.appendChild(credits)

        table.appendChild(tr);

        if (sem != semestersCompleted) {
            const tr = document.createElement("tr");

            const plus = document.createElement("b")
            plus.innerHTML = "+"
            tr.appendChild(plus)

            table.appendChild(tr)
        }
    }


}
const selectSemesters = document.querySelector("select");
selectSemesters.addEventListener("change", displaySemesterCount)

/*****GPA******/
const displaySubjectsCount = () => {
    let subjectsCount = parseInt(noOfSubjects.value)
    if (subjectsCount > 25) {
        alert("Did you really write 25+ subjects in semester exam?\nGreat! But sorry our server is NOT upto your level")
        noOfSubjects.value = ""
        return
    }
    const table = document.querySelectorAll("tbody")[1];
    table.replaceChildren()
    for (let count = 1; count <= subjectsCount; count += 1) {
        const tr = document.createElement("tr");

        const label = document.createElement("label");
        label.innerHTML = `Subject ${count}`

        const grade = document.createElement("input");
        grade.type = "text";
        grade.placeholder = `Grade in Subject ${count}`
        grade.minLength = "1"
        grade.maxLength = "1"

        const x = document.createElement("b")
        x.innerHTML = "x"

        const credits = document.createElement("input");
        credits.type = "number";
        credits.placeholder = `Credits for Subject ${count}`
        credits.min = "0"

        tr.appendChild(label)
        tr.appendChild(grade)
        tr.appendChild(x)
        tr.appendChild(credits)
        table.appendChild(tr);

        if (count != subjectsCount) {
            const tr = document.createElement("tr");

            const plus = document.createElement("b")
            plus.innerHTML = "+"
            tr.appendChild(plus)

            table.appendChild(tr)
        }
    }
}

const noOfSubjects = document.querySelector("input")
noOfSubjects.addEventListener("input", displaySubjectsCount)
