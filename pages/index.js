import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { FormGroup, InputGroup, H1, Spinner, Toaster, Toast, } from '@blueprintjs/core'
import '@blueprintjs/core/lib/css/blueprint.css'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])

  const _update = () => {
    // Show spinner
    setIsLoading(true)

    // Make request
    axios.get('/api/search?q=' + searchTerm).then(data => {
      // Stop spinner
      setIsLoading(false)
      // Show images
      setImages(data.data)
    }).catch(err => {
      // Stop spinner
      setIsLoading(false)
      // Show toast
      Toaster.create().show({
        message: 'Sorry, there was a problem loading results, try again soon.',
        intent: 'danger'
      })
    })
  }

  return (
    <div style={{ width: '90vw', maxWidth: '1000px', margin: '5em auto'}}>

      <H1>img-icons8</H1>
      <p style={{ marginBottom: '2em' }}>Created by <a href="github.com/penguoir">Ori Marash</a></p>

      <FormGroup
        label="Search term"
        labelFor="search"
      >
        <InputGroup
          id="search"
          placeholder="e.g. Checklist"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? _update() : ()=>{} }
        />
      </FormGroup>

      { images.length > 0 && <p>Results</p> }
      <div style={{ marginTop: '2em', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {
          images && !isLoading && images.map((src, i) => (
            <CopyToClipboard
              key={i}
              text={src}
              onCopy={() => {
                Toaster.create().show({ timeout: 2000, message: 'Successfully copied', intent: 'success' })
              }}
            >
              <img src={src} width='100px' style={{ cursor: 'pointer' }} />
            </CopyToClipboard>
          ))
        }

        {/* Spinner */}
        {
          isLoading &&
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <Spinner/>
          </div>
        }
      </div>
    </div>
  )
}