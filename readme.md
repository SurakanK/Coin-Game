Prefab พรีแฟบ
เป็น objecs เกมที่สามารถกำหนด work flow ได้ เหมาะสำหรับการทำ objecs ที่มี work flow ที่เหมือนกัน หลายๆ objec ยกตัวอย่างเช่น ลูกระเบิดในเกม ที่เวลาตัวละครไปชนแล้วเกิดการละเบิด 

Animation
เป็นเครื่องมือในการสร้าง node animation สามารถสร้างภาพเคลื่อนไหว ได้โดนการสร้างภาพเคลื่อนไหวในรูปแบบ farme ต่อ farme  และยังสามารถเขียนฟังชั้นเพื่อสั่งงานในแต่ละ farme ได้

load resource
เป็นการโหลด ข้อมูล image เข้าสู้โปรแกรมเพื่อใช้ในการเปลี่ยนแปลงรูปภาพ objecs ภายในโปรแกรม

Script life cycle
เป็น function หลักของ cocos creator โดย function เหล่านี้นั้นจะทำงานด้วยตัวของมันเองหากผู้สร้างทำการเปิดใช้งาน 

* onLoad เหมาะสำหรับใช้ในการโหลดข้อมูลตอนเริ่ม เช่นการโหลด objecs map รูป เสียง 

* start เหมาะสำหรับการสั่งการ หรือการกำหนดค่าตัวแปร เริ่มตั้นที่ต้องการสั่งการทันทีหลังจาก run

* update เหมาะสำหรับการสั่งงาน objecs ที่มีการเปลี่ยนแปลงตลอดเวลา เนื่องจาก function update จะมีการทำงานตลอดเวลา โดยขึ้นอยู่กับเวลา

* lateUpdate เป็น function ที่ทำงานหลังจากการ update

* onDestroy
* onEnable
* onDisable