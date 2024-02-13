import inquirer from 'inquirer';
class Student {
    name: string;
    studentID: string;
    courses: string[];
    balance: number;

    constructor(name: string, studentID: string) {
        this.name = name;
        this.studentID = studentID;
        this.courses = [];
        this.balance = 0;
    }
     enroll(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }

    payTuition(amount: number) {
        this.balance = this.balance - amount;
        console.log(`Payment of ${amount} received from ${this.name}`);
        if (amount>this.balance){
         console.log("Insufficient Amount");
            
        }
    }

    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: ${this.balance}`);
    }
}

function generateStudentID(): string {
    const randomNumber = Math.floor(100 + Math.random() * 10000); 
    return randomNumber.toString();
}

async function createStudent() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]);

    const studentID = generateStudentID();
    return new Student(answers.name, studentID);
}
async function runStudentManagementSystem() {
    const students: { [key: string]: Student } = {};

    while (true) {
        const { choice } = await inquirer.prompt([
            {
             type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
            'Add New Student',
            'Enroll Student',
            'View Balance',
            'Pay Tuition Fees',
            'Show Status',
            'Exit']
            } ]);

switch (choice) {
     case 'Add New Student':
     const newStudent = await createStudent();
    students[newStudent.studentID] = newStudent;
    console.log(`Student ${newStudent.name} added with ID: ${newStudent.studentID}`);
    break;
     case 'Enroll Student':
     const { studentID, course } = await inquirer.prompt([
    {
    type: 'input',
    name: 'studentID',
    message: 'Enter student ID:'},
    {
    type: 'input',
     name: 'course',
    message: 'Enter course name:'},
    ]);
    students[studentID].enroll(course);
    console.log(`Student ${students[studentID].name} enrollin ${course}`);
    break;
    case 'View Balance':
        const { id1 } = await inquirer.prompt([
        {
        type: 'input',
        name: 'id1',
        message: 'Enter student ID:'}
    ]);
    students[id1].viewBalance();
     break;
 case 'Pay Tuition Fees':
    const { id2, amount } = await inquirer.prompt([
                    {
        type: 'input',
        name: 'id2',
        message: 'Enter student ID:'
                    },
                    {
        type: 'input',
        name: 'amount',
        message: 'Enter amount to pay:'
             }
        ]);
        students[id2].payTuition(parseFloat(amount));
         break;
    case 'Show Status':
        const { id3 } = await inquirer.prompt([
            {
                type: 'input',
                 name: 'id3',
                message: 'Enter student ID:'
            }
                ]);
        students[id3].showStatus();
        break;
            case 'Exit':
        console.log('Exiting...');
        return;
        }
            }
        }

runStudentManagementSystem();
