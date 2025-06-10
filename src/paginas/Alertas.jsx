import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function Alertas() {
    const containerRef = useRef()

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 10)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current.appendChild(renderer.domElement)

        // Luz ambiental
        const light = new THREE.AmbientLight(0xffffff, 1)
        scene.add(light)

        // Textura del plano
        const textureLoader = new THREE.TextureLoader()
        textureLoader.load('/planoBarco.png', (texture) => {
            const aspect = texture.image.width / texture.image.height
            const height = 8  // Aumentamos altura visible
            const width = height * aspect


            const geometry = new THREE.PlaneGeometry(width, height)
            const material = new THREE.MeshBasicMaterial({ map: texture })
            const plane = new THREE.Mesh(geometry, material)
            scene.add(plane)

            // Punto rojo (clicable)
            const pointGeo = new THREE.SphereGeometry(0.1, 32, 32)
            const pointMat = new THREE.MeshBasicMaterial({ color: 'red' })
            const point = new THREE.Mesh(pointGeo, pointMat)
            point.position.set(1, 0.5, 0.01)
            scene.add(point)

            const raycaster = new THREE.Raycaster()
            const mouse = new THREE.Vector2()

            window.addEventListener('click', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

                raycaster.setFromCamera(mouse, camera)
                const intersects = raycaster.intersectObjects([point])
                if (intersects.length > 0) {
                    alert('Haz hecho clic en el punto')
                }
            })
        })

        // Animación
        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        // Limpieza
        return () => {
            renderer.dispose()
        }
    }, [])

    return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
}


