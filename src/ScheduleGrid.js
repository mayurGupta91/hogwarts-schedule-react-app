// ScheduleGrid.js

import React from 'react';
import PropTypes from 'prop-types';

const ScheduleGrid = ({ students }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.name}>
                        <td>{student.name}</td>
                        <td>{Object.keys(student.subjects).join(', ')}</td>
                        <td>
                            {Object.entries(student.subjects).map(([subject, allocatedTeacher]) => (
                                <div key={subject}>
                                    <strong>{subject}: </strong>
                                    {allocatedTeacher}
                                </div>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

ScheduleGrid.propTypes = {
    students: PropTypes.array,
};

export default ScheduleGrid;
