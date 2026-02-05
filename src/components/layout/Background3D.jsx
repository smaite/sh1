import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './Background3D.css'

const Background3D = () => {
    const containerRef = useRef(null)
    const sceneRef = useRef(null)
    const rendererRef = useRef(null)
    const animationIdRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        sceneRef.current = scene

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.z = 30

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 1000
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        // Particle material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x667eea,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        })

        // Particle mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Animation
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate)

            // Rotate particles
            particlesMesh.rotation.y += 0.001
            particlesMesh.rotation.x += 0.0005

            // Mouse interaction
            particlesMesh.rotation.y += mouseX * 0.0005
            particlesMesh.rotation.x += mouseY * 0.0005

            renderer.render(scene, camera)
        }

        animate()

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }
            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement)
            }
            renderer.dispose()
            particlesGeometry.dispose()
            particlesMaterial.dispose()
        }
    }, [])

    return <div ref={containerRef} className="background-3d" />
}

export default Background3D
