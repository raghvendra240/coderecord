const sortOptions = [
    {id: 0, name: 'Submission', value: 'submittedDate', order: "ASC"},
    {id: 1, name: 'Submission', value: 'submittedDate', order: "DESC", default: true},
    {id: 2, name: 'Name', value: 'problemName', order: "ASC"},
    {id: 3, name: 'Name', value: 'problemName', order: "DESC"},
]

module.exports = {
    sortOptions
}