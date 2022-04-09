package lab_2.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;

@Controller
public class UserController {

    @Autowired
    public UsersService usersService;

    @RequestMapping("/api/users")
    @ResponseBody
    public UsersPage users(
            @RequestParam(name="page-number", defaultValue = "1") Integer pageNumber,
            @RequestParam(name="page-size", defaultValue = "20") Integer pageSize)
    {
        return this.usersService.getUsers(pageNumber,pageSize);
    }
}
