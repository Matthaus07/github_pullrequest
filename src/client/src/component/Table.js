import React from 'react';

export default function UserTable({rows}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Title</th>
                    <th>Url Pull</th>
                    <th>State</th>
                    <th>Create At</th>
                </tr>
            </thead>
            <tbody>
                {
                   rows.length > 0 ? (
                    rows.map((row, i) => (

                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.username}</td>
                            <td>{row.title}</td>
                            <td>{row.urlpull}</td>
                            <td>{row.state}</td>
                            <td>{row.createatpull}</td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>{rows[0]} No Users</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )

}
