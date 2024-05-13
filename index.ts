#! /bin/usr/env node
import inquirer from "inquirer";

// define a student class 

class Student {
    static counter = 11001
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 500;
    }
    // method to enroll student and courses

    enroll_course(course: string) {
        this.courses.push(course);
    }
    // method to view a student balance

    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    // method to pay fee of student

    pay_fees(amount: number) {
        this.balance -= amount
        console.log(`$${amount} Fees paid successfully for ${this.name}\nRemaning Balance : $${this.balance}.`)
    }
    // method to display student status

    show_status() {
        console.log(`Id : ${this.id}\nName : ${this.name}\nCourses : ${this.courses}\nBalance : $${this.balance}`)
    }
}
// Student manager class to manage student
class Student_manager {
    students: Student[]

    constructor() {
        this.students = []
    }
    // method to add a new student
    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added successfully. Student ID: ${student.id}`)
    }
    // method to enrol an student in a class
    enroll_student(student_id: number, course: string) {
        let student = this.find_student(student_id)
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`)
        }
    }
    // method to view an student balance
    view_student_balance(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student Not Found. Please Enter A Coorect Student Id");
        }
    }
    // method to pay student fees
    pay_student_fees(student_id: number, amount: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student Not Found. Please Enter A Coorect Student Id");
        }
    }
    // method to display student status
    show_student_status(student_id: number) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }

    }
    // method to find a student by student id
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id)

    }
}
// main function to run the programe

async function main() {
    console.log("Welcome to 'SSS' Student Management System");
    console.log(".".repeat(50))
    
let student_manager = new Student_manager()
// while loop for programe running
while (true) {
    let choice = await inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "Select an option",
        choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
    }])
    // using switch case to handle choices

    switch (choice.choice) {
        case "Add Student":
            let name_input = await inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Enter Student Name"
            }]);
            student_manager.add_student(name_input.name);
            break;

        case "Enroll Student":
            let course_input = await inquirer.prompt([{
                name: "student_id",
                type: "number",
                message: "Enter Student ID"
            },
            {
                name: "course",
                type: "list",
                message: "Enter Course Name",
                choices: ["Typescript", "Python", "Nextjs", "Javascript", "C++"]
            }

            ]);
            student_manager.enroll_student(course_input.student_id, course_input.course);
            break;

        case "View Student Balance":
            let balance_input = await inquirer.prompt([{
                name: "student_id",
                type: "number",
                message: "Enter Student Id"
            }]);
            student_manager.view_student_balance(balance_input.student_id);

            break;
        case "Pay Fees":
            let fees_input = await inquirer.prompt([{
                name: "student_id",
                type: "number",
                message: "Enter Student ID"
            },
            {
                name: "amount",
                type: "number",
                message: "Enter Amount To Pay"
            }]);
            student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
            break;

        case "Show Status":
            let status_input = await inquirer.prompt([{
                name: "student_id",
                type: "number",
                message: "Enter Student Id"
            }]);
            student_manager.show_student_status(status_input.student_id)
            break;

        case "Exit":
            console.log("Exiting...");
            process.exit();

    }
}
} main()