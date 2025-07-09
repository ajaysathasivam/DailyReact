import React, { useEffect } from 'react'

const TestElement = () => {
    useEffect(() => {
        const hasPlan = localStorage.getItem('plan');
        hasPlan ? alert("has") : localStorage.setItem('plan', true)
    }, [])
    return (
        <div>TestElement</div>
    )
}

export default TestElement