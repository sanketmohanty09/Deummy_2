import { LightningElement, wire, track } from 'lwc';
import getStudents from '@salesforce/apex/searchone.getStudents';
const DELAY = 100;

export default class StudentSearch extends LightningElement {
    studentName = '';
    studentFatherName = '';
    studentMotherName = '';
    @track studentList = [];
    @track selectedStudents = [];

    @wire(getStudents, {
        stuName: '$studentName',
    })
    retrieveStudent({ error, data }) {
        if (data) {
            this.studentList = data;
        } else if (error) {
            
        }
    }

    searchStudentAction(event) {
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.studentName = searchString;
        }, DELAY);
    }

    handleCheckboxChange(event) {
        const selectedId = event.target.name;
        if (event.target.checked) {
            this.selectedStudents = [...this.selectedStudents, selectedId];
        } else {
            this.selectedStudents = this.selectedStudents.filter((id) => id !== selectedId);
        }
    }
    
    handleStudentNext() {
        const selectedStudentsEvent = new CustomEvent('selectedstudents', { 
            detail: this.selectedStudents
        })
        
        this.dispatchEvent(selectedStudentsEvent);
    }
}

