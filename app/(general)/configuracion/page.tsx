import Consumidor from '@/app/Contexto/Consumidor'
import ProviderContacto from '@/app/Contexto/ProviderContacto'
import React from 'react'

export default function page() {
  return (
    <div>

        <ProviderContacto>
            <Consumidor></Consumidor>
        </ProviderContacto>
    </div>
  )
}