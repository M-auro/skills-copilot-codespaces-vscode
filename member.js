function skillsMember() {
    let member = {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JavaScript'],
        printSkills: function () {
            this.skills.forEach(function (skill) {
                console.log(`${this.name} knows ${skill}`);
            });
        }
    };
    return member;
}