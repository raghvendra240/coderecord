const sortOptions = [
    {id: 1, name: 'Submission', value: 'submittedDate', order: "ASC"},
    {id: 2, name: 'Submission', value: 'submittedDate', order: "DESC", default: true},
    {id: 3, name: 'Name', value: 'problemName', order: "ASC"},
    {id: 4, name: 'Name', value: 'problemName', order: "DESC"},
]

module.exports = {
    sortOptions
}