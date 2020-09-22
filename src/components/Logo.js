import React, { useState, useEffect } from "react";

export const NavLogo = ()=> {
    return (
        <div
        style={{
          fontSize: '2em',
          textAlign: 'center',
          padding: '.2em',
          color: '#FF4929',
          marginRight: '1em',
        }}
      >
        <span>👩🏽‍💻</span>
        <span
          style={{
            fontSize: '.7em',
            color: '#FF4929',
            verticalAlign: 'center',
            fontWeight: '700',
            lineHeight: '2em',
            padding: '.35em',
          }}
        >
          CodeDoc
        </span>
      </div>
    )
}
