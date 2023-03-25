const sortOptions = [
    {id: 0, name: 'Submission', value: 'submittedDate', order: "ASC"},
    {id: 1, name: 'Submission', value: 'submittedDate', order: "DESC", default: true},
    {id: 2, name: 'Name', value: 'problemName', order: "ASC"},
    {id: 3, name: 'Name', value: 'problemName', order: "DESC"},
]

const filterOptions = [
    {id: 0, name: 'All', value: 'all', default: true},
    {id: 1, name: 'Platform: GFG', value: 'gfg'},
    {id: 2, name: 'Platform: Leetcode', value: 'leetcode'},
    {id: 3, name: 'Have Hints', value: 'haveHints'},
    {id: 4, name: 'Have Reminders', value: 'haveReminders'},
]


module.exports = {
    sortOptions,
    filterOptions
}