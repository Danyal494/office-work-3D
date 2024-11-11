import { Environment, OrbitControls, RandomizedLight } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Loader from './TaskSix/Loader'

const CombinedController = ({ mode }) => {
    const { camera } = useThree()
    const meshRef = useRef()
    const horizontalAngleRef = useRef(0)
    const verticalAngleRef = useRef(0)
    const scrollXRef = useRef(0)
    const scrollYRef = useRef(0)
    const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleScroll = (event) => {
            if (mode === 'camera') {
                horizontalAngleRef.current += event.deltaX * 0.01
                verticalAngleRef.current += event.deltaY * 0.01
            } else if (mode === 'object') {
                scrollXRef.current += event.deltaX * 0.01
                scrollYRef.current += event.deltaY * 0.01
            }
        }

        const handleTouchStart = (event) => {
            const touch = event.touches[0]
            setLastTouch({ x: touch.clientX, y: touch.clientY })
        }

        const handleTouchMove = (event) => {
            const touch = event.touches[0]
            const deltaX = touch.clientX - lastTouch.x
            const deltaY = touch.clientY - lastTouch.y
            if (mode === 'camera') {
                horizontalAngleRef.current += deltaX * 0.01
                verticalAngleRef.current += deltaY * 0.01
            } else if (mode === 'object') {
                scrollXRef.current += deltaX * 0.01
                scrollYRef.current += deltaY * 0.01
            }
            setLastTouch({ x: touch.clientX, y: touch.clientY })
        }

        window.addEventListener('wheel', handleScroll, { passive: true })
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: true })

        return () => {
            window.removeEventListener('wheel', handleScroll)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchmove', handleTouchMove)
        }
    }, [mode, lastTouch])

    useFrame(() => {
        if (mode === 'camera') {
            const radius = 5
            const horizontalAngle = horizontalAngleRef.current
            const verticalAngle = verticalAngleRef.current

            camera.position.x = radius * Math.sin(horizontalAngle) * Math.cos(verticalAngle)
            camera.position.y = radius * Math.sin(verticalAngle)
            camera.position.z = radius * Math.cos(horizontalAngle) * Math.cos(verticalAngle)
            camera.lookAt(0, 0.5, 0)
            camera.updateProjectionMatrix()
        } else if (mode === 'object' && meshRef.current) {
            meshRef.current.rotation.x = scrollYRef.current
            meshRef.current.rotation.y = scrollXRef.current
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial metalness={1} roughness={0} color="orange" />
        </mesh>
    )
}

const TaskThree = () => {
    const [mode, setMode] = useState('camera') // Default to 'camera' mode

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'camera' ? 'object' : 'camera'))
    }

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <button
                onClick={toggleMode}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '10px',
                    zIndex: 100,
                    backgroundColor: "lightgray",
                }}
            >
                Switch to {mode === 'camera' ? 'Object' : 'Camera'} Control
            </button>
            <Suspense fallback={<Loader/>}>
                
            <Canvas style={{ width: '100%', height: '100%' }}
                camera={{ position: [2, 2, 2], fov: 75 }}
                shadows>
                <color attach="background" args={['#64748b']} />
                <RandomizedLight position={[2, 5, 5]} />
                <Environment preset="sunset" background={true} />
                <OrbitControls enableZoom={false} enablePan={false} />

                <CombinedController mode={mode} />

                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.5} />
                </mesh>
            </Canvas>
                    </Suspense>
        </div>
    )
}

export default TaskThree
