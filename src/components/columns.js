import { ColumnFilter } from "./ColumnFilter"

export const COLUMNS = [
    {
        Header : 'Id',
        accessor : 'id',
        Footer : 'Id',
        disableFilters : true
    },
    {
        Header : 'First Name',
        accessor : 'first_name',
        Footer : 'First Name',
    },
    {
        Header : 'Last Name',
        accessor : 'last_name',
        Footer : 'Last Name',
    },
    {
        Header : 'Email',
        accessor : 'email',
        Footer : 'email',
    },
    {
        Header  : 'Car',
        accessor : 'car',
        Footer : 'Car',
    }
    
]

export const GROUPED_CoLUMNS = [
    {
        Header : 'Id',
        accessor : 'id',
        Footer : 'Id'
    },
    {
        Header : 'Name',
        Footer : 'Name',
        columns : [
            {
                Header : 'First Name',
                accessor : 'first_name',
                Footer : 'First Name'
            },
            {
                Header : 'Last Name',
                accessor : 'last_name',
                Footer : 'Last Name'
            }
        ]
    },
    {
        Header : 'Info',
        Footer : 'Info',
        columns : [
            {
                Header : 'Email',
                accessor : 'email',
                Footer : 'email'
            },
            {
                Header  : 'Car',
                accessor : 'car',
                Footer : 'Car'
            },
            {
                Header : 'Date of Birth',
                accessor : 'dob',
                Footer : 'Date of Birth'
            } 
        ]
    }
]