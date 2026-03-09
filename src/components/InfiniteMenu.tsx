import { FC, useRef, useState, useEffect, MutableRefObject } from "react";
import { InfiniteGridMenu } from "./InfiniteGridMenu";

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items?: MenuItem[];
}

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(
    null
  ) as MutableRefObject<HTMLCanvasElement | null>;
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    let sketch: InfiniteGridMenu | null = null;

    const handleActiveItem = (index: number) => {
      if (!items.length) return;
      const itemIndex = index % items.length;
      setActiveItem(items[itemIndex]);
    };

    if (canvas) {
      try {
        sketch = new InfiniteGridMenu(
          canvas,
          items.length ? items : [],
          handleActiveItem,
          setIsMoving,
          (sk) => sk.run()
        );
      } catch (error) {
        console.error("Failed to initialize InfiniteGridMenu:", error);
      }
    }

    const handleResize = () => {
      if (sketch) {
        sketch.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  const handleButtonClick = () => {
    if (!activeItem?.link) return;
    if (activeItem.link.startsWith("http")) {
      window.open(activeItem.link, "_blank");
    } else {
      console.log("Internal route:", activeItem.link);
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        id="infinite-grid-menu-canvas"
        ref={canvasRef}
        className="cursor-grab w-full h-full overflow-hidden relative outline-none active:cursor-grabbing"
      />

      {activeItem && (
        <>
          <h2
            className={`
          select-none
          absolute
          font-black
          [font-size:4rem]
          left-[1.6em]
          top-1/2
          transform
          translate-x-[20%]
          -translate-y-1/2
          transition-all
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          ${
            isMoving
              ? "opacity-0 pointer-events-none duration-[100ms]"
              : "opacity-100 pointer-events-auto duration-[500ms]"
          }
        `}
          >
            {activeItem.title}
          </h2>

          <p
            className={`
          select-none
          absolute
          max-w-[10ch]
          text-[1.5rem]
          top-1/2
          right-[1%]
          transition-all
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          ${
            isMoving
              ? "opacity-0 pointer-events-none duration-[100ms] translate-x-[-60%] -translate-y-1/2"
              : "opacity-100 pointer-events-auto duration-[500ms] translate-x-[-90%] -translate-y-1/2"
          }
        `}
          >
            {activeItem.description}
          </p>

          <div
            onClick={handleButtonClick}
            className={`
          absolute
          left-1/2
          z-10
          w-[60px]
          h-[60px]
          grid
          place-items-center
          bg-[#00ffff]
          border-[5px]
          border-black
          rounded-full
          cursor-pointer
          transition-all
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          ${
            isMoving
              ? "bottom-[-80px] opacity-0 pointer-events-none duration-[100ms] scale-0 -translate-x-1/2"
              : "bottom-[3.8em] opacity-100 pointer-events-auto duration-[500ms] scale-100 -translate-x-1/2"
          }
        `}
          >
            <p className="select-none relative text-[#060010] top-[2px] text-[26px]">
              &#x2197;
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteMenu;