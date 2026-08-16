import React from 'react'
import '@testing-library/jest-dom'

// Globalize React for JSX in tests
if (typeof global !== 'undefined') {
  global.React = React
}
