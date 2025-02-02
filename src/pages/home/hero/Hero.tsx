

const Hero = () => {
  return (
    <div className=" bg-[#373a41] dark:bg-gradient-to-r dark:from-[#121316] dark:to-[#3a3a3a]  overflow-hidden flex items-center mb-12 -mt-4">
      {/* Background Pattern */}
      {/* <div className="absolute left-0 bottom-0 z-0 hidden md:block">
        <Image
          src={images.pattern}
          alt="Background Pattern"
          width={500}
          height={500}
          className=""
        />
      </div> */}

      <div>
        <img src="/src/assets/banner.jpg" alt="" />
      </div>
     
    </div>
  )
}

export default Hero

