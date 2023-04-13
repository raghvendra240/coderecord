const sortOptions = [
    {id: 0, name: 'Submission', value: 'submittedDate', order: "ASC"},
    {id: 1, name: 'Submission', value: 'submittedDate', order: "DESC", default: true},
    {id: 2, name: 'Name', value: 'problemName', order: "ASC"},
    {id: 3, name: 'Name', value: 'problemName', order: "DESC"},
]

const filterOptions = [
    {id: 0, name: 'All', value: 'all', default: true},
    {id: 1, name: 'Platform: GFG', value: 'gfg', query : {platformName: 'gfg'}},
    {id: 2, name: 'Platform: Leetcode', value: 'leetcode', query : {platformName: 'leetcode'}},
    {id: 3, name: 'Have Hints', value: 'haveHints', query : { problemHint: { $ne: '', $exists: true }}},
    {id: 4, name: 'Have Reminders', value: 'haveReminders', query : {reminderDate: {$ne: null}, reminderDate: {$ne: ''}}},
]

const pageSize = 10;

module.exports = {
    sortOptions,
    filterOptions,
    pageSize
}