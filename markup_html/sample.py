import markup

items = ( "Item one", "Item two", "Item three", "Item four" )
paras = ( "This was a fantastic list.", "And now for something completely different." )
images = ( "thumb1.jpg", "thumb2.jpg", "more.jpg", "more2.jpg" )

page = markup.page( )
page.init( title="My title", 
           css=( 'one.css', 'two.css' ), 
           header="Something at the top", 
           footer="The bitter end." )

page.ul( class_='mylist' )
page.li( items, class_='myitem' )
page.ul.close( )
page.add("MOOOO")

page.p( paras )
page.img( src=images, width=100, height=80, alt="Thumbnails" )

print page