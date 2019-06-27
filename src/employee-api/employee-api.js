

export default class EmployeeApi {

  // static getAllEmployees() {
  //   return fetch("/employees").then(resp => resp.json()) ;
  // }
  // USING ASYNC AWAIT
  static getAllEmployees = async () => {
    const resp = await fetch("/employees");
    return await resp.json();
  }

  // static getEmployee(empId) {
  //   return fetch("/employees/" + empId).then(resp => resp.json()) ;
  // }
  // USING ASYNC AWAIT
  static getEmployee = async (empId) => {
    // wrap async/await in try/catch to watch for errors
    try {
      const resp = await fetch("/employees/" + empId);
      // throw errors if they exist
      if (resp.status <200 || resp.status >=300) {
        throw new Error("Unexpected result"); // catch errors below
      }
      return await resp.json();
    // deal with errors based on err number
    } catch (err) {
      console.log(err);
    }
}

  static saveEmployee(employee) {
    //employee = {...employee}; // spread to clone object
                              //to avoid manipulating original employee.

    // Simulate server-side validation
    const minEmpNameLength = 3;
    if (employee.firstName.length < minEmpNameLength) {
      throw new Error(`First Name must be at least ${minEmpNameLength} characters.`);
    }

    if (employee.lastName.length < minEmpNameLength) {
      throw new Error(`Last Name must be at least ${minEmpNameLength} characters.`);
    }

    if (employee.id) { //if id, update employee
      return fetch("/employees/" + employee.id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee) // body data type must match "Content-Type" header
        }
      );
    } else { //if no id, create employee
      return fetch("/employees" ,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee) // body data type must match "Content-Type" header
        }
      ).then(resp => resp.json()) ;
    }

  }

  static deleteEmployee(empId) {
    return fetch("/employees/" + empId ,
                   { method: "DELETE" }
                );
  }

  // static async getAllEmployees() {
  //   const resp = await fetch("/employees");
  //   if(resp.ok) {
  //     return resp.json();
  //   }
  //   throw new Error('Network response was not ok.');
  // }


}
